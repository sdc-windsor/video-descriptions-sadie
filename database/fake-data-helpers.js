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