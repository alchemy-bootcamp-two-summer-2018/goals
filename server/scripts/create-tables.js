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
    name VARCHAR(256),
    user_id INTEGER NOT NULL REFERENCES users(id),
    founded INTEGER,
    description VARCHAR(1024)
  );
`)
  .then(
    () => console.log('create tables complete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });