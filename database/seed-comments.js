const { Pool, Client } = require('pg');
const path = require('path');
const fs = require('fs');
const copyFrom = require('pg-copy-streams').from;
const config = require('./../config.js');
const _ = require('underscore');

const client = new Client({
  user: config.user,
  database: 'vimeo',
  password: config.password,
})

client.connect()

const uploadBatch = (targetTable, batchFile) => {

  var stream = client.query(copyFrom(`COPY ${targetTable} FROM STDIN CSV`))
  var fileStream = fs.createReadStream(batchFile)

  fileStream.on('error', (error) => {
    console.log(`Error in creating read stream ${error}`)
  })
  stream.on('error', (error) => {
    console.log(`Error in creating stream ${error}`)
  })
  stream.on('end', () => {
    console.log(`Completed loading ${batchFile} into ${targetTable}`)

  })
  fileStream.pipe(stream);

}

async function uploadAll() {
  for (var i = 1; i < 41; i++) {
    await uploadBatch('comments', path.join(__dirname, `batch_${i}_comments.txt`))
  }
}

uploadAll();