require('dotenv').config();
const client = require('../db-client');
const goals = require('./goals.json');

Promise.all(
  goals.map(goal => {
    return client.query(`
      INSERT INTO goals (user_id, name, completed)
      VALUES ($1, $2, $3);
    `,
    [goal.userId, goal.name, goal.completed]
    ).then(result => result.rows[0]);
  })
)
  .then(
    () => console.log('seed goals successful'),
    err => console.error(err)
  )
  .then(() => client.end());