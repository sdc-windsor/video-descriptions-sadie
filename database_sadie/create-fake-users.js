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
  let ids = _.range(1, 30000);
  writeBatch(ids, `/batch_1_users.txt`, makeUser);
}

// create 29,999 users
createFakeUsers();