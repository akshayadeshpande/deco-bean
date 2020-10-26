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
 * API Call to get all friends of a users. 
 * 
 * @param {Object} Optional data object container values to pass to request such as search query.
 * @param {Object} Context object for firebase api, primarly for user auth at this stage.
 * @returns Successful response code 200, with Object containing all users' friends.
 * @throws functions.https.HttpsError internal error if https call failed.
 */
exports.getUserFriends = functions.https.onCall(async (data, context) => {
    if (!context.auth){
        throw new functions.https.HttpsError('failed-precondition', 'A users friend can only be retrieved when logged in.');
    }
    try {
        const user_id =  context.auth.uid;

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
 * API Call to add a user as a friend.  
 * 
 * @param {Object} Data data object container values to pass to request such as friend to add.
 * @param {Object} Context object for firebase api, primarly for user auth at this stage.
 * @returns Successful response code 200, on adding the user friend. 
 * @throws functions.https.HttpsError internal error if https call failed.
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

/**API Call to search all the users in the system. Uses JavaScript based text matching due
 * to limitations of the Firebase. 
 * 
 * @param {Object} Data data object container values to pass to request such as search query.
 * @param {Object} Context object for firebase api, primarly for user auth at this stage.
 * @returns Successful response code 200, with Object containing all users whose name matches query string.
 * @throws functions.https.HttpsError internal error if https call failed.
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
        let user_id = context.auth.uid;
        let users = [];
        var snapshot = await admin.firestore().collection('users').get();
        let friends = (await admin.firestore().collection('users').doc(user_id).get()).get('friends');
        
        // A set of a user's friends used for checking later is a user is friend in better runtime
        let friendSet = new Set();
        friends.forEach(friend => {
            friendSet.add(friend.id);
        })
        
        // Does a check to see if a user is a current friend and also if it matches the query string. 
        // Currently a javascript search is used as firebase does not allow wildcard searches. 
        snapshot.forEach((user) => {
            if (!friendSet.has(user.id) && user.data().name.toLowerCase().includes(data.name.toLowerCase())) {
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


