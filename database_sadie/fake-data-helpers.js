const faker = require('faker');
const _ = require('underscore')
const fs = require('fs');

// **** Fake Descriptions ****
const getRandomInt = function (max) {
  return Math.floor(Math.random() * (max)) + 1;
}

const categories = ['Animation', 'Comedy', 'Music', 'Education', 'Art & Design', 'Documentary', 'Food', 'Fashion', 'Travel', 'Journalism']
const getCategories = () => {
  return _.sample(categories, getRandomInt(5));
};

const getRandomLikes = () => {
  return (Math.random() > .9) ? getRandomInt(1000000) : getRandomInt(500);
}

const makeDescription = (id) => {
  let _id = id;
  let video_id = id;
  let description = faker.lorem.sentences(3);
  let categories = '{' + getCategories().join(', ') + '}';
  let likes = getRandomLikes();

  return [_id, video_id, description, categories, likes].join('\t')
}

// **** Fake Users ****
function makeUser(id) {
  let _id = id;
  let username = faker.internet.userName();
  let user_thumbnail = faker.internet.avatar();
  return [_id, username, user_thumbnail];
}

const writeBatch = (ids, fileName, fakeDataFunction) => {
  let dataString = ids.map((id) => { return fakeDataFunction(id) }).join('\r');
  fs.writeFile(__dirname + fileName, dataString, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}

async function createFakeDescriptions() {
  let start = 1;
  let end = 1000001;
  let result = []
  for (let i = 0; i < 10; i++) {
    let ids = await _.range(start, end);
    await writeBatch(ids, `/batch_${i + 1}_descriptions.txt`, makeDescription)
    result.push(ids);
    start += 10;
    end += 10;
  }
  return (result);
}

function createFakeUsers() {
  let ids = _.range(1, 30000)
  writeBatch(ids, `/batch_1_users.txt`, makeUser)
}

async function createFakeComments() {
  let start = 1;
  let end = 1000001;
  let result = []
  for (let i = 0; i < 10; i++) {
    let ids = await _.range(start, end);
    await writeBatch(ids, `/batch_${i + 1}_${table}.txt`)
    result.push(ids);
    start += 10;
    end += 10;
  }
  return (result);
}

module.exports = { createFakeDescriptions, createFakeUsers, createFakeComments }



// logUser();


// //function that save video comments to database
// async function logComment() {
//     for (let i = 1; i < 101; i++) {
//         for (let j = 0; j < 10; j++) {
//             const randomComment = await faker.lorem.sentences();
//             const randomDate = await faker.date.past();
//             const user_id = await User.findOne({username: videoData[j].author});
//             console.log(user_id._id);
//             await saveComment(i, user_id._id, randomComment, randomDate, () => {
//                 console.log(videoData[j].author);
//                 console.log(i,j)
//             })
//         }

//     }
// }

// logComment();

// const faker = require('faker');

// var make_user = function(id) {

// }