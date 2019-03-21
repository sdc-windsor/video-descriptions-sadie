const { Pool, Client } = require('pg');
const path = require('path');
const fs = require('fs');
const copyFrom = require('pg-copy-streams').from;
const config = require('./../config.js');

// batch file to upload to db table
let batchFile = path.join(__dirname, '/batch_1_description.txt');
let table = 'db.description';

const client = new Client({
  user: config.user,
  database: 'vimeo',
  password: config.password,
})

client.connect()

const bulkUpload = (targetTable, batchFile) => {
  const execute = (target, callback) => {
      client.query(`Truncate ${target}`, (err) => {
              if (err) {
              client.end()
              callback(err)
              } else {
              console.log(`Truncated ${target}`)
              callback(null, target)
              }
          })
  }
  execute(targetTable, (err) =>{
      if (err) return console.log(`Error in Truncate Table: ${err}`)
      var stream = client.query(copyFrom(`COPY ${targetTable} FROM STDIN DELIMITER E'/t'`))
      var fileStream = fs.createReadStream(batchFile)

      fileStream.on('error', (error) =>{
          console.log(`Error in creating read stream ${error}`)
      })
      stream.on('error', (error) => {
          console.log(`Error in creating stream ${error}`)
      })
      stream.on('end', () => {
          console.log(`Completed loading data into ${targetTable}`)
          client.end()
      })
      fileStream.pipe(stream);
  })
}
// Execute the function
bulkUpload(table, batchFile)