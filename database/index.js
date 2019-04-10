import Pool from 'pg';
import config from './../config.js';

const pool = new Pool({
  user: config.user,
  password: config.password,
  host: config.host,
  port: config.port,
  database: 'vimeo',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

module.exports = pool;

