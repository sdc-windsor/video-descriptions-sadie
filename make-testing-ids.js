const fs = require('fs');
const faker = require('faker')

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

let i = 0;
let ids = [];

while (i < 100000) {
  let temp1 = getRandomArbitrary(9000000, 10000000);
  let temp2 = faker.random.alphaNumeric(10).toUpperCase();
  ids.push('' + temp1 + ',' + temp2)
  i += 1;
}

const result = ids.join('\n');

fs.writeFile('testing_ids.csv', result, (err) => {
  if (err) { console.log(err) }
})