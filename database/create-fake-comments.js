const faker = require('faker');
const fs = require('fs');
const _ = require('underscore');
const { getRandomInt } = require('./fake-data-helpers.js');

const getRandomCommentQuantity = () => {
  return (Math.random() > .95) ? getRandomInt(20) : getRandomInt(5);
}

const makeComment = (id) => {
  let _id = faker.random.alphaNumeric(10).toLocaleUpperCase();
  let video_id = id;
  let user_id = getRandomInt(30000);
  let comment = faker.lorem.sentence();

  return [_id, video_id, user_id, comment].join(', ');
};

async function writeBatchComments(ids, fileName) {
  let dataString = ids.map((id) => {
    let numOfComments = getRandomCommentQuantity();
    var comments = [];
    while (numOfComments > 0) {
      comments.push(makeComment(id));
      numOfComments--;
    }
    return comments.join('\r');
  }).join('\r')


  await fs.writeFile(__dirname + fileName, dataString, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}

function createFakeComments(i, start, end) {
  let ids = _.range(start, end);
  writeBatchComments(ids, `/batch_${i + 1}_comments.txt`);
};

async function blah (n, s) {
  let start = s;
  let end = start + 250000;
  for (let i = n; i < n + 5; i++) {
    await createFakeComments(i, start, end);
    start += 250000;
    end += 250000;
  }
}

// console.log(_.range(1, 10000000, 1250000))

// blah(0, 1);
// blah(5, 1250001)
// blah(10, 2500001)
// blah(15, 3750001)
// blah(20, 5000001)
// blah(25, 6250001)
async function bleep() {
  await blah(30, 7500001)
}
bleep();
async function bleep2() {
  await blah(35, 8750001)
}
bleep2();
