const faker = require('faker');
const _ = require('underscore')
const fs = require('fs');

const getRandomInt = function (max) {
  return Math.floor(Math.random() * (max)) + 1;
}

const writeBatch = (ids, fileName, fakeDataFunction) => {
  let dataString = ids.map((id) => { return fakeDataFunction(id) }).join('\r');
  fs.writeFile(__dirname + fileName, dataString, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}

module.exports = { writeBatch, getRandomInt }



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