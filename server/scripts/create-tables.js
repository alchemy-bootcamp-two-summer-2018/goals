require('dotenv').config();
const client = require('../db-client');

client.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(256) NOT NULL,
    password VARCHAR(256) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS statuses (
    id SERIAL PRIMARY KEY,
    status VARCHAR(256)
  );

  CREATE TABLE IF NOT EXISTS goals (
    id SERIAL PRIMARY KEY,
    goal VARCHAR(1000),
    status_id INTEGER NOT NULL REFERENCES statuses(id),
    user_id INTEGER NOT NULL REFERENCES users(id)
  );
`)
  .then(
    () => console.log('create tables complete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });