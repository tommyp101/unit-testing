const admin = require("./firebaseAdmin");
const createUser = require("./utils/createUser");
const { environment } = require("./environment/environment");
const addFirestoreUsers = require("./utils/addFirestoreUsers");
const deleteFirestoreUsers = require("./utils/deleteFirestoreUsers");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Do you want to add, delete, or update a user? ", (answer) => {
  switch (answer.toLowerCase().trim()) {
    case "add":
      rl.question("How many users do you want to add? ", (numUsers) => {
        const numberOfUsers = parseInt(numUsers);
        if (isNaN(numberOfUsers) || numberOfUsers <= 0) {
          console.error("Please enter a valid positive number.");
          rl.close();
          return;
        }

        addFirestoreUsers(numberOfUsers)
          .then(() => {
            console.log("Users added successfully.");
            rl.close();
          })
          .catch((error) => {
            console.error("Error adding users:", error);
          });
      });
      break;
    case "delete":
      deleteFirestoreUsers()
        .then(() => {
          console.log("User deleted successfully.");
          rl.close();
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
      break;

    case "update":
      updateProfileInFirebase()
        .then(() => {
          console.log("User updated successfully.");
          rl.close();
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
      break;

    default:
      console.log(
        'Invalid option. Please choose "add", "delete", or "update".'
      );
      rl.close();
  }
});
