const faker = require('faker');
const _ = require('underscore');
const { writeBatch, getRandomInt } = require('./fake-data-helpers.js');

const getRandomCommentQuantity = () => {
  return (Math.random() > .9) ? getRandomInt(20) : getRandomInt(5);
}

const makeComment = (id, vid_id) => {
  let _id = id;
  let video_id = vid_id;
  let user_id = getRandomInt(29000);
  let comment = faker.sentence();

  return [_id, video_id, user_id, comment];
};

async function createFakeComments() {
  let start = 1;
  let end = 1000001;
  for (let i = 0; i < 10; i++) {
    let ids = await _.range(start, end);
    await writeBatch(ids, `/batch_${i + 1}_comments.txt`, makeComment)
    result.push(ids);
    start += 100000;
    end += 100000;
  }
};

createFakeComments()

