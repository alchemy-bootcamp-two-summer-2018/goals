require('dotenv').config();

const express = require('express');
const app = express();

// const request = require('superagent');

const cors = require('cors');
const morgan = require('morgan');
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use(express.static('public'));

const client = require('./db-client');

app.post('/api/auth/signup', (req, res) => {
  const body = req.body;
  const email = body.email;
  const password = body.password;

  if(!email || !password) {
    res.status(400).send({
      error: 'email and password are required'
    });
    return;
  }

  client.query(`
    select count(*)
    from users
    where email = $1
  `,
  [email])
    .then(results => {
      if(results.rows[0].count > 0) {
        res.status(400).send({ error: 'email already in use' });
        return;
      }

      client.query(`
        insert into users (email, password)
        values ($1, $2)
        returning id, email
      `,
      [email, password])
        .then(results => {
          res.send(results.rows[0]);
        });
    });
});

app.post('/api/auth/signin', (req, res) => {
  const body = req.body;
  const email = body.email;
  const password = body.password;

  if(!email || !password) {
    res.status(400).send({
      error: 'email and password are required'
    });
    return;
  }

  client.query(`
    select id, email, password
    from users
    where email = $1
  `,
  [email])
    .then(results => {
      const row = results.rows[0];
      if(!row || row.password !== password) {
        res.status(401).send({ error: 'invalid email or password' });
        return;
      }
      res.send({
        id: row.id,
        email: row.email
      });
    });
});

app.use((req, res, next) => {
  const id = req.get('Authorization');
  if(!id) {
    res.status(403).send({
      error: 'No token found'
    });
    return;
  }

  req.userId = id;
  next();
});

app.get('/api/me/goals', (req, res) => {
  client.query(`
    SELECT
      id,
      goal,
      complete,
      user_id as "userID"
      FROM goals g
      WHERE user_id = $1
      ORDER BY id;
  `,
  [req.userId]
  )
    .then(result => {
      console.log(result);
      res.send(result.rows);
    })
    .catch(err => console.log(err));
});

// app.post('/api/me/goals', (req, res, next) => {
//   const body = req.body;
//   if(body.name === 'error') return next('bad name');

//   client.query(`
//     INSERT INTO goals (goal, complete)
//     values ($1, false)
//     returning *, "user_id as userId";
//   `,
//   [req.goal, req.complete]
//   ).then(result => {
//     res.send(result.rows[0]);
//   })
//     .catch(next);
// });

// app.get('/api/users', (req, res) => {
//   client.query(`
//     SELECT
//       g.id,
//       g.goal,
//       g.complete,
//       u.id as "userID"
//       FROM goals g
//       RIGHT JOIN users u
//       ON u.id = g.user_id
//       ORDER BY g.goal;
//   `)
//     .then(result => {
//       console.log(result);
//       res.send(result.rows);
//     })
//     .catch(err => console.log(err));
// });

// app.get('/api/users', (req, res) => {
//   client.query(`
//     SELECT
//       g.id,
//       g.goal,
//       g.complete,
//       g.user_id as "userId"
//       FROM goals g;

//     SELECT
//       u.id,
//       u.email
//       FROM users u;
//   `)
//     .then(result => {
//       const goals = result[0];
//       const users = result[1];
//       users.forEach(user => {
//         user.goals = goals.filter(goal => {
//           return goal.userID === goal.id;
//         });
//       });
//       res.send(users);
//     })
//     .catch(err => console.log(err));
// });

const PORT = process.env.PORT;
app.listen(PORT, () => console.log('server running on port', PORT));