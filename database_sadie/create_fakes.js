const faker = require('faker');
const _ = require('underscore')
const fs = require('fs');

//create 10 categories
const categories = ['Animation', 'Comedy', 'Music', 'Education', 'Art & Design', 'Documentary', 'Food', 'Fashion', 'Travel', 'Journalism']
const getRandomInt = function (max) {
  return Math.floor(Math.random() * (max)) + 1;
}
const getCategories = () => {
  return _.sample(categories, getRandomInt(5));
};
const getRandomLikes = () => {
  return (Math.random() > .9) ? getRandomInt(1000000) : getRandomInt(500);
}

const getDescriptionJSON = (id) => {
  return {
    _id: id,
    video_id: id,
    description: faker.lorem.paragraph(),
    categories: getCategories(),
    likes: getRandomLikes()
  }
}

const getDescriptionCSV = (id) => {
  let _id = id;
  let video_id = id;
  let description = faker.lorem.sentences(3);
  let categories = '{' + getCategories().join(', ') + '}';
  let likes = getRandomLikes();

  return [_id, video_id, description, categories, likes].join('\t')
}

const writeBatchCSV = (ids, fileName) => {
  let dataString = ids.map((id) => {return getDescriptionCSV(id)}).join('\r');
  fs.writeFile(__dirname + fileName, dataString, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}

// create description dummy data
// let first = _.range(1, 1000001);
// writeBatchCSV(first, '/batch_1_description.txt')
// let second = _.range(1000001, 2000001);
// writeBatchCSV(second, '/batch_2_description.txt')
// let third = _.range(2000001, 3000001);
// writeBatchCSV(third, '/batch_3_description.txt')
// let fourth = _.range(3000001, 4000001);
// writeBatchCSV(fourth, '/batch_4_description.txt')
// let fifth = _.range(4000001, 5000001);
// writeBatchCSV(fifth, '/batch_5_description.txt')
// let sixth = _.range(5000001, 6000001);
// writeBatchCSV(sixth, '/batch_6_description.txt')
// let seventh = _.range(6000001, 7000001);
// writeBatchCSV(seventh, '/batch_7_description.txt')
// let eigth = _.range(7000001, 8000001);
// writeBatchCSV(eigth, '/batch_8_description.txt')
// let ninth = _.range(8000001, 9000001);
// writeBatchCSV(ninth, '/batch_9_description.txt')
// let tenth = _.range(9000001, 10000001);
// writeBatchCSV(tenth, '/batch_10_description.txt')


// //function that save user data into database
// async function logUser () {
//     for (let i = 0; i < 100; i++) {
//         const randomUserAvatar = await faker.internet.avatar();
//         await saveUser(videoData[i].author, randomUserAvatar, function(data) {
//             console.log(data);
//         })
//     }
// }


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