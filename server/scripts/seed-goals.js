require('dotenv').config();
const client = require('../db-client');
const goals = require('./goals.json');

Promise.all(
  goals.map(g => {
    return client.query(`
      INSERT INTO goals (
        name,
        user_id,
        completed
      )
      VALUES ($1, $2, $3);
      `,
    [g.name, g.userId, g.completed]
    ).then(result => result.rows);
  })
)
  .then(
    () => console.log('seed data load sucessful'),
    err => console.error(err)
  )
  .then(() => client.end());

