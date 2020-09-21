const functions = require('firebase-functions');

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();


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


exports.startChallenge = functions.https.onCall(async (data, context) => {
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




exports.getRandomWords = functions.https.onCall(async(data, context) => {
  try{
    var max = 21;
    var min = 1;
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
    
    return {output: words, code: 200}
  } catch (err) {
    console.log(err);
    return {status:'error', code: 401, message: err}
  }
})





