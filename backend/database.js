var admin = require("firebase-admin");

let privatekey;
if (process.env.PRIVATE_KEY) {
	privatekey = JSON.parse(process.env.PRIVATE_KEY);
}
else {
	privatekey = require("../firestore-private-key.json");
}

admin.initializeApp({
	credential: admin.credential.cert(privatekey)
});

function getDatabase() {
	return admin.firestore()
}

module.exports = getDatabase
