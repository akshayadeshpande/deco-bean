const functions = require('firebase-functions');

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

const challenge = require('./challenge')

exports.startChallenge = challenge.startChallenge;


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

exports.getMe = functions.https.onCall(async (data, context) => {
  try{
    console.log(context)
    console.log(data)
  } catch (err) {
    return {status: 'error', code: 401, message: 'Not signed in'}
  }
})
