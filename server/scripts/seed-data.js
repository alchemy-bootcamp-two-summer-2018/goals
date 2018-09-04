require('dotenv').config();
const client = require('../db-client');
const statuses = require('./statuses.json');

Promise.all(
  statuses.map(status => {
    return client.query(`
      INSERT INTO statuses (status)
      VALUES ($1);
    `,
    [status.status]
    ).then(result => result.rows[0]);
  })
)
  .then(
    () => console.log('seed data load successful'),
    err => console.error(err)
  )
  .then(() => client.end());