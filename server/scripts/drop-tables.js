require('dotenv').config();
const client = require('../db-client');

client.query(`
    DROP TABLE IF EXISTS goals;
    DROP TABLE IF EXISTS users;
`)
  .then(
    () => console.log('Boom! Drop tables complete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });