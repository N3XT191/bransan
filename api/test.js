const admin = require("firebase-admin");
const { v4: uuid } = require('uuid');
require('dotenv').config()
const firebase = admin.initializeApp(
    {
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: process.env.FIREBASE_ADMIN_KEY,
            clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        }),
    },
    uuid()
);

const messaging = firebase.messaging();

// messaging.subscribeToTopic('dtGMuVFvH8ZV-N0PFnbCfW:APA91bHZrRMfyJlv8vGCLZonoyy5x-5ZbMZ0xZO0B8ySl2BpounyWhFudpxqj1WA9K-gRp2yGV8pKLi9kiPChTOWp574z_BrObQ4zc3vz-uoMI6ZWFqvR9vVYKVB7sY0ZOkAmzHKYB-5', 'bransanupdate')
//     .then((res) => { console.log("Done:", res) })
//     .catch((err) => { console.log("Error:", err) });


messaging.sendToTopic('bransanupdate', {
    notification: {
        "title": "Background Message Title",
        "body": "Background message body"
    },
})
    .then((res) => { console.log("Done:", res) })
    .catch((err) => { console.log("Error:", err) });
