const functions = require('firebase-functions')
const admin = require('firebase-admin')

/**
 * Helper method used to remove the verbosity of data sent via the API and to summarise some of 
 * the user's data. The method removes the specific 'friends' from the user's data and instead
 * adds a total count. Similarly it adds a count for the seen words and removes the specific seen words.
 */
var handleUserData = function(data) {

    // Manipulates the user's data to remove vebosity add summary stats
    if (data.friends){
        data['friendCount'] = data['friends'].length;
        delete data['friends']; 
    }
    if (data.seen){
        data['wordCount'] = {};
        for (var key in data.seen){
            data['wordCount'][key] = data.seen[key].length;
        }
        delete data['seen'];
    }
    data['signedUp'] = data['signedUp'].toDate().toString();
    // Output handling to remove verbose data e.g. friends/seen words. Firebase does not support 
    // currently support getting multiple specific fields in one request, hence removing some is more efficient.

    return data;
}

/**
 * Returns the basic information of the user. 
 * 
 * This API does not return a verbose output of the user information and precludes information such as users' friends and seen words. To retrieve 
 * that information the client needs to call getUserWords and getUserFriends. 
 */
exports.getUser = functions.https.onCall(async (data, context) => {
    // Check if the user is logged in or not. 
    if (!context.auth){
        throw new functions.https.HttpsError('failed-precondition', 'A user can only be retrieved when logged in.');
    }
    try {
        const user_id = context.auth.uid;
        let userData = (await admin.firestore().collection('users').doc(user_id).get()).data();

        userData = handleUserData(userData);

        return {status: 'success', code: 200, message: 'Successfully retrieved user data.', user: userData};
    } catch (err) {
        console.log(err);
        throw new functions.https.HttpsError('internal', 'An internal error occured.');
    }
});

/**
 * API call used to retrieve the friends of a particular user.
 * 
 * @data: The data which is passed when the function call is made, however no data is required for this API call.
 * @context: Data parsed and passed automatically by firebase such as user auth. 
 */
exports.getUserFriends = functions.https.onCall(async (data, context) => {
    if (!context.auth){
        throw new functions.https.HttpsError('failed-precondition', 'A users friend can only be retrieved when logged in.');
    }
    try {
        const user_id = context.auth.uid;

        // Fetches friends' data from the user's profile
        let friends = (await admin.firestore().collection('users').doc(user_id).get()).get('friends');
        friends.forEach((friend, index, array) => {
            array[index] = friend.get();
        })
        friends = await Promise.all(friends);
        // Manipulates friend data to remove verbosity
        friends.forEach((friend, index, array) => {
            let userData = handleUserData(friend.data());
            userData['id'] = friend.id;
            array[index] = userData;
        })
        
        return {status: 'success', code: 200, message: 'Successfully retrieved user\'s friend data.', friends: friends};
    } catch (err) {
        console.log(err);
        throw new functions.https.HttpsError('internal', 'An internal error occured.');
    }
});

/**
 * API call used to add friends for a user. The API call is made within the app from the display
 * which only allows adding of one valid user from the search results hence only valid userids of 
 * users are assumed to be in the input. 
 * 
 * @data: The data which is passed when the function call is made. It must contain the parameter 'friends', 
 *        which is a list of user ids to add as friends. 
 * @context: Data parsed and passed automatically by firebase such as user auth. 
 */
exports.addUserFriends = functions.https.onCall(async (data, context) => {
    if (!context.auth){
        throw new functions.https.HttpsError('failed-precondition', 'A friend can only be added when logged in.');
    }
    if (!data.friends) {
        throw new functions.https.HttpsError('invalid-argument', 'Invalid arguments for function call. \
        Ensure a list of friends are provided in the API call');
    }
    try {       
        const user_id = context.auth.uid;
        var currentFriends = (await admin.firestore().collection('users').doc(user_id).get()).get('friends');
        var friendsRef = [];

        for (let i = 0; i < data.friends.length; i++){
            friendsRef.push(admin.firestore().collection('users').doc(data.friends[i]).get());
        }

        friendsRef = await Promise.all(friendsRef);
        // Creates an array of friend's document references to set as the user's friends.
        friendsRef.forEach((friend, index, array) => {
            currentFriends.push(friend.ref);
        })

        await admin.firestore().collection('users').doc(user_id).update({friends: currentFriends});
        
        return {status: 'success', code: 200, message: 'Successfully added user\'s friend data.'};
    } catch (err) {
        console.log(err);
        throw new functions.https.HttpsError('internal', 'An internal error occured.');
    }
});

/**
 * API call used to remove friends for a user. The API call is made within the app from the display
 * which shows the user's friends hence only valid userids of users which are actually registered as 
 * friends is included. 
 * 
 * @data: The data which is passed when the function call is made. It must contain the parameter 'friends', 
 *        which is a list of user ids to remove as friends.
 * @context: Data parsed and passed automatically by firebase such as user auth. 
 */
exports.removeUserFriends = functions.https.onCall(async (data, context) => {
    if (!context.auth){
        throw new functions.https.HttpsError('failed-precondition', 'A friend can only be added when logged in.');
    }
    if (!data.friends) {
        throw new functions.https.HttpsError('invalid-argument', 'Invalid arguments for function call. \
        Ensure a list of friends are provided in the API call');
    }
    try {       
        const user_id = context.auth.uid;
        var currentFriends = (await admin.firestore().collection('users').doc(user_id).get()).get('friends');
        var friendsId = new Set();

        // Creates a set of the user ids to remove. 
        for (let i = 0; i < data.friends.length; i++){
            friendsId.add(data.friends[i]);
        }

        // Checks to see if current friend of a user is one that has to be removed and removes them accordingly
        currentFriends.forEach((friend, index, array) => {
            if (friendsId.has(friend.id)){
                array.splice(index, 1);
            }
        })
        await admin.firestore().collection('users').doc(user_id).update({friends: currentFriends});
        
        return {status: 'success', code: 200, message: 'Successfully removed user\'s friend data.'};
    } catch (err) {
        console.log(err);
        throw new functions.https.HttpsError('internal', 'An internal error occured.');
    }
});

/**
 * API call to search users by their first name in the database. This search is a handled not via the databse 
 * but via JavaScript due to the limitations posed by the database of conducting indexed text searches.  
 * 
 * @data: The data which is passed when the function call is made. It must contain the parameter 'name', which
 *        which represents the name of the users to search.
 * @context: Data parsed and passed automatically by firebase such as user auth. 
 */
exports.searchUsers = functions.https.onCall(async (data, context) => {
    if (!context.auth){
        throw new functions.https.HttpsError('failed-precondition', 'Users can only be searched when logged in.');
    }
    if (!data.name) {
        throw new functions.https.HttpsError('invalid-argument', 'Invalid arguments for function call. \
        Ensure a name of a user is included as part of the request payload.');
    }
    try {       
        let users = [];
        var snapshot = await admin.firestore().collection('users').get();
        
        // Checks to see if the user's name matches the search query. Handled in JavaScript due to limtiations of Firestore
        snapshot.forEach((user) => {
            if (user.data().name.includes(data.name)) {
                let userData = handleUserData(user.data());
                delete userData['email'];
                userData['id'] = user.id;
                users.push(userData);
            }
        });
              
        return {status: 'success', code: 200, message: 'Successfully retrieved users.', users: users};
    } catch (err) {
        console.log(err);
        throw new functions.https.HttpsError('internal', 'An internal error occured.');
    }

});


