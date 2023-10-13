const firebaseCredentials = require("./firebase-credentials.json");

const environment = {
  firebase: {
    databaseURL: `https://${
      (firebaseCredentials && firebaseCredentials.project_id) || ""
    }.firebaseio.com`,
    credentials: firebaseCredentials,
  },
};

module.exports = { environment };
