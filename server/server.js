require('dotenv').config();

//basic express app
const express = require('express');
const app = express();

// superagent client AJAX library for calling 3rd party APIs
const request = require('superagent');

// middleware (cors and read json body)
const cors = require('cors');
const morgan = require('morgan');
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// server files in public directory
app.use(express.static('public'));

// connect to the database
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
  [email]
  )
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
  // is there a Authorization header?
  const id = req.get('Authorization');
  if(!id) {
    // no - send an error
    res.status(403).send({
      error: 'No token found'
    });
    return;
  }

  // 1. set req.userId to the header
  req.userId = id;
  // 2. call next()
  next();
});


app.post('/api/goals', (req, res, next) => {
  const body = req.body;
  if(body.name === 'error') return next('bad name');

  client.query(`
    insert into goals (user_id, name)
    values ($1, $2)
    returning *;
  `,
  [req.userId, body.name]
  ).then(result => {
    res.send(result.rows[0]);
  })
    .catch(next);
});


// app.get('/api/goals', (req, res, next) => {
//   const goalPromise = client.query(`
//     SELECT name
//     FROM goals
//     WHERE user_id = $1;
//   `,
//   [req.userId]);

//   Promise.all(goalPromise)
//     .then(promiseValues => {
//       const goalResult = proviseValues[0];
//       if(goalResult.rows.length ===0) {
//         res.sendStatus(404);
//         return;
//       }

//       const goal = goalResult.rows[0];
//       res.send(goal);
//     })
//     .catch(next);
// })

app.get('/api/goals', (req, res, next) => {
  client.query(`
    SELECT name
    FROM goals
    WHERE user_id = $1;
  `,
  [req.userId])
    .then(result => {
      res.send(result.rows);
    })
    .catch(next);
})





const PORT = process.env.PORT;
app.listen(PORT, () => console.log('server humming along on port', PORT));