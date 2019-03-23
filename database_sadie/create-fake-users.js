const { writeBatch } = require('./fake-data-helpers.js');
const faker = require('faker');
const _ = require('underscore');

function makeUser(id) {
  let _id = id;
  let username = faker.internet.userName();
  let user_thumbnail = faker.internet.avatar();
  return [_id, username, user_thumbnail];
}

function createFakeUsers() {
  let ids = _.range(1, 30001);
  writeBatch(ids, `/batch_1_users.txt`, makeUser);
}

// create 30000 users
createFakeUsers();