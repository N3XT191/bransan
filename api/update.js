const fetch = require('node-fetch');
const DOMParser = require('dom-parser');
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

const getProgressData = async function () {
    let data = [];

    await fetch("https://www.brandonsanderson.com/", {
    })
        .then((response) => {
            return response.text();
        })
        .then((html) => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(html, "text/html");
            let labels = doc.getElementsByClassName("vc_label");

            for (let i = 0; i < labels.length; i++) {
                let label = labels[i].textContent;
                let splitted = label.split(' ');
                data.push({
                    title: splitted.slice(0, -1).join(' '),
                    percentage: parseInt(splitted.slice(-1)[0].slice(0, -1)),
                });
            }
        })
    return data;
}

module.exports = async (req, res) => {
    await getProgressData().then(async (data) => {
        await db.collection('progressData').add({
            data: data,
            updatedOn: firebase.firestore.FieldValue.serverTimestamp()
        });
    });
    res.statusCode = 200;
    res.json({ message: "Success! Yay! This is awesome!" });
}
