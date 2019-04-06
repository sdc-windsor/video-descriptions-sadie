const pool = require('./index.js');
const helpers = require('./seeding-helpers');

pool.connect((err, client) => {
  if (err) throw err
  helpers.uploadBatch(client, 'comments', path.join(__dirname, 'comments.csv'));
})