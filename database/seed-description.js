const pool = require('./index.js');
const helpers = require('./seeding-helpers');

(async () => {
  const client = await pool.connect()
  try {
    await helpers.uploadAll(client, 'descriptions', 'descriptions.txt', 10)
  } finally {
    // client.release() // ask leslie about client closing
  }
})().catch(e => console.log(e))