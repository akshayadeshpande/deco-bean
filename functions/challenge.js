const functions = require('firebase-functions')
const admin = require('firebase-admin')

exports.startChallenge = functions.https.onCall(async (data, context) => {
    // Check if the user is logged in or not. 
    if (!context.auth){
        throw new functions.https.HttpsError('failed-precondition', 'A challenge can only be started when logged in.');
    }
    try {
        // Creates a new entry of a flashcard challenge for the user 
        const newChallenge = await admin.firestore().collection('users').doc(context.auth.uid).collection('flashcard').add({
            'start': admin.firestore.FieldValue.serverTimestamp()
        }); 

        // Defines all the parameters required for the randomisation of the quiz
        const max = 21;
        const count = data.count;
        var words = [];    
        var randomNums = new Set();

        // Creates a collection of random words and their data which are sent to the user for the quiz
        while(randomNums.size <= count){
            randomNums.add('Word' + Math.floor(Math.random() * max + 1));
        }
        randomNums = Array.from(randomNums);
        for (let i = 0; i < count; i++){
            words.push(admin.firestore().collection('WordData').doc(randomNums[i]).get())
        }

        // Ensures all the requests to fetch the data from Firestore are resolved before sending the data to client
        words = await Promise.all(words);
        for (let i = 0; i < count; i++){
            words[i] = words[i].data();
        }

        return {status: 'success', code: 200, id: newChallenge.id, words: words, message: 'Successfully started a new challenge instance!'};
      
    } catch (err) {
        console.log(err);
        throw new functions.https.HttpsError('internal', 'An internal error occured.')
    }
});
