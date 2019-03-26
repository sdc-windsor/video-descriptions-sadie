const pool = require('../database/index.js');

// pool.query('SELECT * FROM descriptions WHERE video_id = $1', [req.params.video_id])
// pool.query('SELECT * FROM descriptions WHERE video_id = $1', [2])
//   .then(res => {
//     console.log(res.rows[0])
//   })
//   .catch(e => console.log(e))

// pool.query('SELECT * FROM users WHERE video_id = $1', [req.params.user_id])
pool.query('SELECT * FROM users WHERE _id = $1', [2])
  .then(res => (console.log(res.rows[0])))
  .catch(e => console.log(e))

pool.end();