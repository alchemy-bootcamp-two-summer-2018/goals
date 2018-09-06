require('dotenv').config();
const client = require('../db-client');
const users = require('../users.json');
const goals = require('../goals.json');

Promise.all(
  users.map(user => {
    return client.query(`
        INSERT INTO users (email, password)
        VALUES ($1, $2);
    `,
    [user.email, user.password]
    ).then(result => result.rows[0]);
  })
)
  .then(() => {
    return Promise.all(
      goals.map(goal => {
        return client.query(`
          INSERT INTO goals (
            id,
            description,
            completed
          )
          VALUES ($1, $2, $3);
      `,
        [goal.userId, goal.description, goal.completed]
        ).then(result => result.rows[0]);
      })
    );
   
  })
  .then(
    () => console.log('seed data load successful'),
    err => console.error(err)
  )
  .then(() => client.end());

