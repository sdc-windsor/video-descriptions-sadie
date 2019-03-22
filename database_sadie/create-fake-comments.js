const faker = require('faker');
const fs = require('fs');
const _ = require('underscore');
const { getRandomInt } = require('./fake-data-helpers.js');

const getRandomCommentQuantity = () => {
  return (Math.random() > .9) ? getRandomInt(20) : getRandomInt(5);
}

const makeComment = (id, vid_id) => {
  let _id = id;
  let video_id = vid_id;
  let user_id = getRandomInt(29000);
  let comment = faker.lorem.sentence();

  return [_id, video_id, user_id, comment].join(', ');
};

async function writeBatchComments(ids, fileName, comment_id) {
  let dataString = ids.map((id) => {
    let numOfComments = getRandomCommentQuantity();
    var comments = [];
    while (numOfComments > 0) {
      comments.push(makeComment(comment_id, id));
      numOfComments--;
      comment_id++;
    }
    return comments.join('\r');
  }).join('\r')


  await fs.writeFile(__dirname + fileName, dataString, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
  return comment_id;

}

async function createFakeComments() {
  let start = 1;
  let end = 500001;
  var comment_id = 1;
  for (let i = 0; i < 10; i++) {
    let ids = _.range(start, end);
    comment_id = await writeBatchComments(ids, `/batch_${i + 1}_comments.txt`, comment_id);
    start += 1000000;
    end += 1000000;
  }
};

createFakeComments()

var comment_id = 1;
comment_id =  writeBatchComments(_.range(1, 1000001), `/batch_1_comments.txt`, comment_id);
console.log(comment_id)