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

let lastData, lastDocId;

const compare = function(data1, data2) {
    console.log(data1);
    console.log(data2);
    for (let key in data1) {
        if (data1[key] !== data2[key]) {
            return false;
        }
    }
    return true;
}


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

const checkDataAndUpdate = async function (req, res) {
    if (lastDocId !== null) {
        const querySnapshot = await db.collection("progressData")
            .orderBy("checkedOn", "desc")
            .limit(1)
            .get();
        if (querySnapshot.empty) {
            await getProgressData().then(async (data) => {
                const docRef = await db.collection('progressData').add({
                    data: data,
                    updatedOn: firebase.firestore.FieldValue.serverTimestamp(),
                    checkedOn: firebase.firestore.FieldValue.serverTimestamp()
                });
                lastData = Object.assign({}, data);
                lastDocId = docRef.id;
            });
            res.statusCode = 200;
            res.json({ message: "Data updated for the first time." });
            return;
        } else {
            const doc = querySnapshot.docs[0].data();
            lastData = Object.assign({}, doc.data);
            lastDocId = querySnapshot.docs[0].id;
        }
    }
    await getProgressData().then(async (data) => {
        if (compare(data, lastData)) {
            await db.collection('progressData').doc(lastDocId).update({
                checkedOn: firebase.firestore.FieldValue.serverTimestamp()
            });

            res.statusCode = 200;
            res.json({ message: "Done checking. Data hasn't updated. Same old, same old." });
        } else {
            const docRef = await db.collection('progressData').add({
                data: data,
                updatedOn: firebase.firestore.FieldValue.serverTimestamp(),
                checkedOn: firebase.firestore.FieldValue.serverTimestamp()
            });

            lastDocId = docRef.id;
            lastData = Object.assign({}, data);

            res.statusCode = 200;
            res.json({ message: "Data updated! New document created." });
        }
    });

}

module.exports = async (req, res) => {
    await checkDataAndUpdate(req, res);
}
