const admin = require("firebase-admin");
const { v4: uuid } = require('uuid');
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

module.exports = async (req, res) => {
    console.log(req.body);
    
    res.statusCode = 200;
    res.json({ message: "Hmm!" });
}
