const { Pool, Client } = require('pg');
const config = require('./../config.js');

const client = new Client({
  user: config.user,
  database: 'vimeo',
  password: config.password,
})

client.connect()

let t0 = new Date();
let t1;

client.query('select * from descriptions where video_id = 9928960;', (err, res) => {
  if (err) {
    console.log(err)
  } else {
    t1 = new Date()
    console.log(res.rows);
    console.log('MS: ', t1 - t0)
    client.end()
  }
})

// client.query('select * from comments where video_id = 9928980;', (err, res) => {
//   if (err) {
//     console.log(err)
//   } else {
//     t1 = new Date()
//     console.log(res.rows);
//     console.log('MS: ', t1 - t0)
//     client.end()
//   }
// })

// client.query('select * from users where _id = 29998;', (err, res) => {
//   if (err) {
//     console.log(err)
//   } else {
//     t1 = new Date()
//     console.log(res.rows);
//     console.log('MS: ', t1 - t0)
//     client.end()
//   }
// })
