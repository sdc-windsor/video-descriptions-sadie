const pool = require('./index.js');
const path = require('path');
const helpers = require('./seeding-helpers');

(async () => {
  const client = await pool.connect()
  try {
    await helpers.uploadBatch(client, 'users', path.join(__dirname, 'batch_1_users.txt'));
  } finally {
    client.release()
  }
})().catch(e => console.log(e.stack))

