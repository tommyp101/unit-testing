const faker = require("@faker-js/faker").faker;
const getRandomElements = require("./getRandomElements");
const religionData = require("../data/religionData");
const cuisineData = require("../data/cuisineData");
const interestData = require("../data/interestData");

function createUser() {
  const religionArray = getRandomElements(religionData, 1);
  const cuisineArray = getRandomElements(cuisineData, 5);
  const interestArray = getRandomElements(interestData, 5);
  const age = faker.number.int({ min: 18, max: 100 });
  const age_min = faker.number.int({ min: 18, max: 100 });
  const age_max = faker.number.int({ min: age_min, max: 100 });
  const bio = faker.person.bio();
  const name = faker.person.firstName();
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

  return (user = {
    name,
    gender,
    genderPreference,
    age,
    age_min,
    age_max,
    bio,
    state,
    lastActive,
    religion,
    cuisine,
    interest,
  });
}
module.exports = createUser;
