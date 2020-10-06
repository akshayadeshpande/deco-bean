const functions = require('firebase-functions')
const admin = require('firebase-admin')


var handleUserData = function(data) {

    // Manipulates the user's data to remove vebosity add summary stats
    data['friend_count'] = data['friends'].length;
    data['word_count'] = {};
    for (var key in data.seen){
        data['word_count'][key] = data.seen[key].length;
    }

    // Output handling to remove verbose data e.g. friends/seen words. Firebase does not support 
    // currently support getting multiple specific fields in one request, hence removing some is more efficient.
    delete data['friends'];
    delete data['seen'];

    return data;
}

/**
 * Returns the basic information of the user. 
 * 
 * This API does not return a verbose output of the user information and precludes information such as users' friends and seen words. To retrieve 
 * that information the client needs to call getUserWords and getUserFriends. 
 * 
 */
exports.getUser = functions.https.onCall(async (data, context) => {
    // Check if the user is logged in or not. 
    if (!context.auth){
        throw new functions.https.HttpsError('failed-precondition', 'A challenge can only be started when logged in.');
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
 * Returns the friends of a specific user. 
 */
exports.getUserFriends = functions.https.onCall(async (data, context) => {
    if (!context.auth){
        throw new functions.https.HttpsError('failed-precondition', 'A challenge can only be started when logged in.');
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
            array[index] = handleUserData(friend.data());
        })
        
        return {status: 'success', code: 200, message: 'Successfully retrieved user\'s friend data.', friends: friends};
    } catch (err) {
        console.log(err);
        throw new functions.https.HttpsError('internal', 'An internal error occured.');
    }
});

exports.addUserFriends = functions.https.onCall(async (data, context) => {
    if (!context.auth){
        throw new functions.https.HttpsError('failed-precondition', 'A challenge can only be started when logged in.');
    }
    if (!data.friends) {
        throw new functions.https.HttpsError('invalid-argument', 'Invalid arguments for function call. \
        Ensure a list of friends are provided in the API call');
    }
    try {       
        const user_id = context.auth.uid;
        var friendsRef = [];

        for (let i = 0; i < data.friends.length; i++){
            friendsRef.push(admin.firestore().collection('users').doc(data.friends[i]).get());
        }

        friendsRef = await Promise.all(friendsRef);
        // Creates an array of friend's document references to set as the user's friends.
        friendsRef.forEach((friend, index, array) => {
            array[index] = friend.ref;
        })

        await admin.firestore().collection('users').doc(user_id).update({friends: friendsRef});
        
        return {status: 'success', code: 200, message: 'Successfully added user\'s friend data.'};
    } catch (err) {
        console.log(err);
        throw new functions.https.HttpsError('internal', 'An internal error occured.');
    }
});
