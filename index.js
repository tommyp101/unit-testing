const faker = require("@faker-js/faker").faker;
const admin = require("firebase-admin");
const { environment } = require("./environment/environment");
const getRandomElements = require("./utils/getRandomElements");
const religionData = require("./data/religionData");
const cuisineData = require("./data/cuisineData");
const interestData = require("./data/interestData");

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
const religionArray = getRandomElements(religionData, 1);
const cuisineArray = getRandomElements(cuisineData, 5);
const interestArray = getRandomElements(interestData, 5);

console.log(religionArray, cuisineArray, interestArray);
const age = faker.number.int({ min: 18, max: 100 });
const age_min = faker.number.int({ min: 18, max: 100 });
const age_max = faker.number.int({ min: 18, max: 100 });
const bio = faker.person.bio();
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const gender = faker.person.sex();
const genderPreference = faker.person.sex();
const state = faker.location.state();
const lastActive = faker.date.between({
  from: "2023-09-01T00:00:00.000Z",
  to: "2023-10-03T00:00:00.000Z",
});
const religion = religionArray;
const cuisine = cuisineArray;
const interest = interestArray;

console.log("Religion: ", religion);
console.log("Cuisines: ", cuisine);
console.log("Interests: ", interest);
console.log("First Name:", firstName);
console.log("Last Name:", lastName);
console.log("Gender:", gender);
console.log("Gender Preference:", genderPreference);
console.log("Age:", age);
console.log("State:", state);
console.log("Bio:", bio);
console.log("Last Active: ", lastActive);
