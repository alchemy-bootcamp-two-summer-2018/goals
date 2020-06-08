require('dotenv').config();
const client = require('../db-client');

client.query(`
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS goals; 
`)
  .then(
    () => console.log('drop tables complete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });
