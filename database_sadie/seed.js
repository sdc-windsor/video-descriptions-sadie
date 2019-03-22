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

  var stream = client.query(copyFrom(`COPY ${targetTable} FROM STDIN DELIMITER E'\t'`))
  var fileStream = fs.createReadStream(batchFile)

  fileStream.on('error', (error) => {
    console.log(`Error in creating read stream ${error}`)
  })
  stream.on('error', (error) => {
    console.log(`Error in creating stream ${error}`)
  })
  stream.on('end', () => {
    console.log(`Completed loading ${batchFile} into ${targetTable}`)
    // client.end()
  })
  fileStream.pipe(stream);

}
// batch file to upload to db table
async function bulkUpload(fileNames, table) {
  fileNames.forEach((fileName) => {
    await uploadBatch(table, fileName);
  })
}

// Execute the function
let descriptionBatchFiles = _.range(1, 11).map(num => path.join(__dirname, `/batch_${num}_description.txt`));
bulkUpload(descriptionBatchFiles, 'descriptions');

client.end()