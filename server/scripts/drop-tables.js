require('dotenv').config();
const client = require('../db-client');

client.query(`
  DROP TABLE IF EXISTS users CASCADE;
  DROP TABLE IF EXISTS goals CASCADE;
  DROP TABLE IF EXISTS statuses CASCADE;
`)
  .then(
    () => console.log('drop tables complete'),
    err => console.log(err)
  )
  .then (() => {
    client.end();
  });