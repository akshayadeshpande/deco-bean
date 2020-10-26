const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const challenge = require('./challenge');
const user = require('./user');

exports.startChallenge = challenge.startChallenge;
exports.endChallenge = challenge.endChallenge;
exports.getChallenges = challenge.getChallenges;
exports.getUser = user.getUser;
exports.getUserFriends = user.getUserFriends;
exports.addUserFriends = user.addUserFriends;
exports.searchUsers = user.searchUsers;


/**
 * API Call to get all words stored in the system
 * 
 * @param {Object} Optional data object container values to pass to request.
 * @param {Object} Context object for firebase api, primarly for user auth at this stage.
 * @returns Successful response code 200, with Object containing all the word or 500 if an 
 *          internal error orccrs
 */
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

/**
 * API Call to get all users.
 * 
 * @param {Object} Optional data object container values to pass to request.
 * @param {Object} Context object for firebase api, primarly for user auth at this stage.
 * @returns Successful response code 200, with Object containing all users or 500 if an internal
 *          error occurs. 
 * @throws functions.https.HttpsError internal error if https call failed.
 */
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

/**
 * API Call to get the word of the day and its associated information. The word of day
 * is based on the date howwver a more complex mechanism will be required as the corpus
 * of words in the system grows. 
 * 
 * @param {Object} Optional data object container values to pass to request.
 * @param {Object} Context object for firebase api, primarly for user auth at this stage.
 * @returns Successful response code 200, with Object containing word of the day.
 * @throws functions.https.HttpsError internal error or if https call failed.
 */
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
