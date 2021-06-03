import * as fetch from 'node-fetch';
import * as DOMParser from 'dom-parser';
import db from "../firestore";

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
export default async function (req, res) {
    await getProgressData().then((data) => {
        db.collection('progressData').add({
            data: data,
            updatedOn: admin.firestore.FieldValue.serverTimestamp()
        });
    });
    res.statusCode = 200;
    res.json({message: "Success! Yay! This is awesome!"});
}
