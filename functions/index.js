const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const challenge = require('./challenge')
const user = require('./user');

exports.startChallenge = challenge.startChallenge;
exports.endChallenge = challenge.endChallenge;
exports.getChallenges = challenge.getChallenges;
exports.getUser = user.getUser;
exports.getUserFriends = user.getUserFriends;
exports.addUserFriends = user.addUserFriends;
exports.searchUsers = user.searchUsers;
exports.removeUserFriends = user.removeUserFriends;


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// Take the text parameter passed to this HTTP endpoint and insert it into 
// Cloud Firestore under the path /messages/:documentId/original
exports.getWords = functions.https.onRequest(async (req, res) => {
    try{

        let result = await admin.firestore().collection('WordData').get(); //TODO: add query if needed
        let response = [];
      
        result.forEach(doc => {
          response.push(doc.data());
        });
      
        return res.send( { "collection" : response} );
      
    }catch(err){
        res.status(500).send(err);
    }
  });

exports.getUsers = functions.https.onRequest(async (req, res) => {
    try{

        let result = await admin.firestore().collection('users').get(); //TODO: add query if needed
        let response = [];
      
        result.forEach(doc => {
          response.push(doc.data());
        });
      
        return res.send( { "collection" : response} );
      
    }catch(err){
        res.status(500).send(err);
    }
});

exports.getWotd = functions.https.onCall(async (data, context) => {
    if (!context.auth){
        throw new functions.https.HttpsError('failed-precondition', 'A word of the day can only be retrieved when logged in.');
    }
    try {
        const user_id = context.auth.uid;

        const wordCount = (await admin.firestore().collection('WordData').doc('count').get()).data().count;
        var randInt = new Date().getUTCDate() % wordCount;

        let word = (await admin.firestore().collection('WordData').doc('Word' + randInt.toString()).get()).data();
        let user = (await admin.firestore().collection('users').doc(user_id).get()).data();
        let mappings = (await admin.firestore().collection('mappings').doc('mappings').get()).data();

        let homeLangWord = word[mappings.codes[user.homeLang]];
        let forLangWord = word[mappings.codes[user.forLang]];

        return {status: 'success', code: 200, homeLangWord: homeLangWord, forLangWord: forLangWord, word: word, userForLang: mappings.codes[user.forLang]};
    } catch (err) {
        console.log(err);
        throw new functions.https.HttpsError('internal', 'An internal error occured.');
    }
});
