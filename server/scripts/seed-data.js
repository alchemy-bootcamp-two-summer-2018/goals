require('dotenv').config();
const client = require('../db-client');

Promise.all(
  user.filter(password => {
    return client.query(`
        INSERT INTO users (id, password)
        VALUES ($1, $2);
    `,
    [user.name, user.password]
    ).then(result => result.users);
  })
)
  .then(() => {
   
  })
  .then(
    () => console.log('seed data load successful'),
    err => console.error(err)
  )
  .then(() => client.end());