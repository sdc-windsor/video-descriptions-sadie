const path = require('path');
const fs = require('fs');
const copyFrom = require('pg-copy-streams').from;
const _ = require('underscore');

const uploadBatch = (client, targetTable, batchFile) => {

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

async function uploadAll(client, targetTable, n) {
  for (var i = 1; i <= n; i++) {
    await uploadBatch(client, targetTable, path.join(__dirname, `batch_${i}_${targetTable}.csv`))
  }
}

module.exports = {uploadBatch, uploadAll};