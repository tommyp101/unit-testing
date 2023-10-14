const admin = require("../firebaseAdmin.js");
const fs = require("fs");
const path = require("path");
const createUser = require("./createUser");
const config = require("../config");

// Ensure admin is initialized and contains firestore
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
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  }
  const filePath = path.join(
    __dirname,
    `../userids/${collectionName.toLowerCase()}_ids.txt`
  );

  // Write IDs to a file
  fs.appendFile(filePath, ids.join("\n") + "\n", (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
    console.log("IDs appended to ids.txt");
  });

  return ids; // Return IDs to the caller if needed
}

module.exports = addFirestoreUsers;
