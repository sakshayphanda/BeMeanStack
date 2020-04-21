const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const app = require('./src/app');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
exports.application = functions.https.onRequest(app);

