const faker = require('faker');
const _ = require('underscore')
const { writeBatch, getRandomInt } = require('./fake-data-helpers.js')

const categories = ['Animation', 'Comedy', 'Music', 'Education', 'Art & Design', 'Documentary', 'Food', 'Fashion', 'Travel', 'Journalism']
const getCategories = () => {
  return _.sample(categories, getRandomInt(5));
};

const getRandomLikes = () => {
  return (Math.random() > .9) ? getRandomInt(1000000) : getRandomInt(500);
}

const makeDescription = (id) => {
  let video_id = id;
  let description = faker.lorem.sentences(3);
  let categories = '{' + getCategories().join(', ') + '}';
  let likes = getRandomLikes();

  return [id, video_id, description, categories, likes].join('\t')
}

function createFakeDescriptions(end, i) {
  const start = end - 1000000;
  const ids = _.range(start, end);
  writeBatch(ids, `/batch_${Number(i) + 1}_descriptions.txt`, makeDescription)
}

const batchNum = process.env.BATCH_NUM || 0;
const ends = _.range(1000001, 11000001, 1000000)

createFakeDescriptions(ends[batchNum], batchNum);