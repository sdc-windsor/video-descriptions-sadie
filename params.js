const fs = require('fs');
const faker = require('faker')

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

let i = 0;
let ids = {
  keys: ["video_id"],
  values: []
}

while (i < 100000) {
  ids.values.push([getRandomArbitrary(9000000, 10000000)])
  i += 1;
}

const result = JSON.stringify(ids);

fs.writeFile('testing_ids.json', result, (err) => {
  if (err) { console.log(err) }
})