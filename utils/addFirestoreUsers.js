const admin = require("../firebaseAdmin.js");
const fs = require("fs");
const path = require("path");
const createUser = require("./createUser");
const config = require("../config");

console.log(admin);
const db = admin.firestore();

async function addFirestoreUsers(numberOfUsers) {
  const collectionName = config.collectionName;

  const ids = [];

  for (let i = 0; i < numberOfUsers; i++) {
    const user = createUser();
    console.log(user);

    try {
      const docRef = await db.collection(collectionName).add(user);
      console.log("User added with ID: ", docRef.id);
      ids.push(docRef.id); // Store the ID

      // Update the document to add the uid field
      await db.collection(collectionName).doc(docRef.id).update({
        uid: docRef.id,
      });

      console.log(`UID ${docRef.id} added to user`);
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  }

  const filePath = path.join(
    __dirname,
    `../userids/${collectionName.toLowerCase()}_ids.txt`
  );

  fs.appendFile(filePath, ids.join("\n") + "\n", (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
    console.log(`IDs appended to ${collectionName}_ids.txt`);
  });

  return ids;
}

module.exports = addFirestoreUsers;
