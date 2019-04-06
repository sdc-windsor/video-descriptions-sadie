const pool = require('./index.js');
const path = require('path');
const helpers = require('./seeding-helpers');

pool.connect((err, client) => {
  if (err) throw err
  helpers.uploadBatch(client, 'users', path.join(__dirname, 'batch_1_users.txt'));
})