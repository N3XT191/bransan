const firebase = require("firebase/app");
require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyBVX9U5QKfsnK_riVTVz_EPhx5OK1OVRZc",
    authDomain: "bransanprogressbars.firebaseapp.com",
    projectId: "bransanprogressbars",
    storageBucket: "bransanprogressbars.appspot.com",
    messagingSenderId: "664667945076",
    appId: "1:664667945076:web:1e644f710444ce7c6a3921"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

db.collection('testCollection').add({
    data: "huh",
    updatedOn: firebase.firestore.FieldValue.serverTimestamp()
});
