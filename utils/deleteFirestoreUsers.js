const fs = require("fs");
const path = require("path");
const admin = require("../firebaseAdmin.js");
const db = admin.firestore();
const config = require("../config");

async function deleteProfilesFromFirebase() {
  const collectionName = config.collectionName;
  const filePath = path.join(
    __dirname,
    `../userids/${collectionName.toLowerCase()}_ids.txt`
  );

  // Read IDs from the file
  fs.readFile(filePath, "utf8", async (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    const ids = data.split("\n").filter((id) => id); // Filter out empty strings
    if (ids.length === 0) {
      console.log("No IDs found in the file.");
      return;
    }

    // Delete each user from Firestore
    for (const id of ids) {
      try {
        await db.collection(collectionName).doc(id).delete();
        console.log(`User with ID ${id} deleted successfully.`);
      } catch (error) {
        console.error(`Error deleting user with ID ${id}:`, error);
      }
    }

    // Clear the ids.txt file after deleting all users
    fs.writeFile(filePath, "", (err) => {
      if (err) {
        console.error("Error clearing the ids.txt file:", err);
        return;
      }
      console.log(`${collectionName}_ids.txt file cleared.`);
    });
  });
}

module.exports = deleteProfilesFromFirebase;
