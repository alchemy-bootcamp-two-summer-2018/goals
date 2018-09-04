require('dotenv').config();
const client = require('../db-client');
const goals = require('./goals.json');
const users = require('./users.json');

Promise.all(
    users.map(user => {
        return client.query(`
            INSERT INTO users (email, password)
            VALUES ($1, $2)    
        `,
        [user.email, user.password]
        ).then(result => result.rows[0]);
    })
)
Promise.all(
    goals.map(goal => {
        return client.query(`
            INSERT INTO goals (user_id, goal)
            SELECT
                id as user_id,
                $1 as name
            FROM users
            
            VALUES ($1)
        `,
        [goal.name]
        ).then(result => result.rows[0]);
    })
)

.then(
    () => console.log('Heck yes! Seed data load successful'),
    err => console.error(err)
  )
  .then(() => client.end());