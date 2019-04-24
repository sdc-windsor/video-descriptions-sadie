const fs = require('fs');
const faker = require('faker')

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const sentences = [
  'hey dude!',
  'that was awesome',
  'hated it',
  ':)'
]
let i = 0;
let ids = {
  keys: ["video_id", "user_id", "comment"],
  values: []
}

while (i < 100000) {
  ids.values.push([
    getRandomArbitrary(9000000, 10000000),
    getRandomArbitrary(1, 30000),
    sentences[getRandomArbitrary(1, 4)]
  ])
  i += 1;
}

const result = JSON.stringify(ids);

fs.writeFile('testing_post_ids.json', result, (err) => {
  if (err) { console.log(err) }
})