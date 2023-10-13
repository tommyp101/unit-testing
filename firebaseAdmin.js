const admin = require("firebase-admin");
const { environment } = require("./environment/environment");
try {
  admin.initializeApp({
    credential: admin.credential.cert(environment.firebase.credentials),
    projectId: environment.firebase.credentials.project_id,
    databaseURL: environment.firebase.databaseURL,
  });
  console.log("Firebase Admin initialized successfully.");
} catch (error) {
  console.error("Error initializing Firebase Admin:", error);
}

module.exports = admin;
