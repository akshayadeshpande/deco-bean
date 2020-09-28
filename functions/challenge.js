const functions = require('firebase-functions');
// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');

exports.startChallenge = functions.https.onCall(async (data, context) => {
    try {
        console.log(context.auth.uid);
        
        const newChallenge = await admin.firestore().collection('users').doc('oX9d1xHogJVY5YSvEzuZbcjPLdB3').collection('flashcard').add({
            'start': admin.firestore.FieldValue.serverTimestamp()
        });
        const min = 1;
        const max = 21;
        var words = [];
    
        var randomNums = new Set();
        while(randomNums.size <= 10){
            randomNums.add('Word' + Math.floor(Math.random() * (max - min + 1) + min));
        }
        var randomNumsArray = Array.from(randomNums);
        
        words.push((await admin.firestore().collection('WordData').doc(randomNumsArray[0]).get()).data());
        words.push((await admin.firestore().collection('WordData').doc(randomNumsArray[1]).get()).data());
        words.push((await admin.firestore().collection('WordData').doc(randomNumsArray[2]).get()).data());
        words.push((await admin.firestore().collection('WordData').doc(randomNumsArray[3]).get()).data());
        words.push((await admin.firestore().collection('WordData').doc(randomNumsArray[4]).get()).data());
        words.push((await admin.firestore().collection('WordData').doc(randomNumsArray[5]).get()).data());
        words.push((await admin.firestore().collection('WordData').doc(randomNumsArray[6]).get()).data());
        words.push((await admin.firestore().collection('WordData').doc(randomNumsArray[7]).get()).data());
        words.push((await admin.firestore().collection('WordData').doc(randomNumsArray[8]).get()).data());
        words.push((await admin.firestore().collection('WordData').doc(randomNumsArray[9]).get()).data());
        return {status: 'success', code: 200, id: newChallenge.id, words: words, message: 'Successfully started a new challenge instance!'};
      
    } catch (err) {
        console.log(err);
        return {status: 'error', code: 500, message: err};
    }
});
