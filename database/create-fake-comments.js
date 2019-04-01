const faker = require('faker');
const fs = require('fs');
const _ = require('underscore');
const { getRandomInt } = require('./fake-data-helpers.js');

const getRandomCommentQuantity = () => {
  return (Math.random() > .95) ? getRandomInt(20) : getRandomInt(5);
}

const makeComment = (video_id) => {
  let id = faker.random.alphaNumeric(10).toUpperCase();
  let user_id = getRandomInt(30000);
  let comment = faker.lorem.sentence();
  let date = faker.date.between('2016-01-01', '2019-03-01').toISOString().substr(0, 19).replace('T', ' ');

  return [id, video_id, user_id, comment, date].join(', ');
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

async function createFakeComments(i, start, end) {
  let ids = _.range(start, end);
  await writeBatchComments(ids, `/batch_${i + 1}_comments.csv`);
};

async function createFakeCommentsBatch(n, s) {
  let start = s;
  let end = start + 250000;
  for (let i = n; i < n + 5; i++) {
    await createFakeComments(i, start, end);
    start += 250000;
    end += 250000;
  }
}

const batchNum = process.env.BATCH_NUM || 0;
const runs = [
  [0, 1], [5, 1250001],
  [10, 2500001], [15, 3750001],
  [20, 5000001], [25, 6250001],
  [30, 7500001], [35, 8750001]
];

const n = runs[batchNum][0];
const s = runs[batchNum][1];

createFakeCommentsBatch(n, s);

