function getRandomElements(arr, maxRandomElements) {
  let resultArray = [];
  const n = Math.min(
    arr.length,
    Math.floor(Math.random() * maxRandomElements) + 1
  );
  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    resultArray.push(arr.splice(randomIndex, 1)[0]);
  }
  return resultArray;
}

module.exports = getRandomElements;
