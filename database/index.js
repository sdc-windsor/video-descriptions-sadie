const { Pool, Client } = require('pg');
const config = require('./../config.js');

const pool = new Pool({
  user: config.user,
  database: 'vimeo',
  password: config.password,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

module.exports = pool;

