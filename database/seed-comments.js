const pool = require('./index.js');
const helpers = require('./seeding-helpers');

(async () => {
  const client = await pool.connect()
  try {
    await helpers.uploadAll(client, 'comments', 40)
  } finally {
    // client.release()
  }
})().catch(e => console.log(e.stack))
