const faker = require('faker');
const _ = require('underscore')
const { writeBatch, getRandomInt } = require('./fake-data-helpers.js')

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

async function createFakeDescriptions() {
  let start = 1;
  let end = 1000001;
  for (let i = 0; i < 10; i++) {
    let ids = _.range(start, end);
    await writeBatch(ids, `/batch_${i + 1}_descriptions.txt`, makeDescription)
    start += 1000000;
    end += 1000000;
  }
}

// create 10 million fake descriptions
createFakeDescriptions();

// const getDescriptionJSON = (id) => {
//   return {
//     _id: id,
//     video_id: id,
//     description: faker.lorem.paragraph(),
//     categories: getCategories(),
//     likes: getRandomLikes()
//   }
// }