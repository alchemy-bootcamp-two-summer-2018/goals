require('dotenv').config();
const client = require('../db-client');

client.query(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(256) NOT NULL,
        password VARCHAR(256) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS goals (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        name VARCHAR(256) NOT NULL,
        completed BOOLEAN
    );
`)
  .then(
    () => console.log('create tables compleeeeeete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });