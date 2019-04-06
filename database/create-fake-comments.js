const faker = require('faker');
const fs = require('fs');
const _ = require('underscore');
const { getRandomInt } = require('./fake-data-helpers.js');
const path = require('path');

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

const makeVideoComments = (video_id) => {
  let numOfComments = getRandomCommentQuantity();
  var comments = [];
  while (numOfComments > 0) {
    comments.push(makeComment(video_id));
    numOfComments--;
  }
  return comments.join('\r');
}

var fileStream = fs.createWriteStream(path.join(__dirname, 'comments.csv'))

function write10mil(writer, encoding, callback) {
  let i = 10000000;
  write();
  function write() {
    let ok = true;
    do {
      var data = makeVideoComments(i);
      i--;
      if (i === 0) {
        // last time!
        writer.write(data, encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
}

write10mil(fileStream, 'utf8', () => {fileStream.end()})
