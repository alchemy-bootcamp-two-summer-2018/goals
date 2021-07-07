require('dotenv').config();
const client = require('../db-client');
const goals = require('./goals.json');

Promise.all(
  goals.map(goal => {
    return client.query(`
      INSERT INTO goals (goal, complete, user_id)
      VALUES ($1, $2, $3);
    `,
    [goal.goal, goal.complete, goal.user_id]
    ).then(result => result.rows[0]);
  })
)
  .then(
    () => console.log('seed goal data load successful'),
    err => console.error(err)
  )
  .then(() => client.end());