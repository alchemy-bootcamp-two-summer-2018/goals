require('dotenv').config();

// basic express app
const express = require('express');
const app = express();

// superagent client AJAX library for calling 3rd party APIs
const request = require('superagent');

// logging
const morgan = require('morgan');
app.use(morgan('dev'));

// middleware (cors and read json body)
const cors = require('cors');
app.use(cors());
app.use(express.json());

// server files in public directory
app.use(express.static('public'));

// connect to the database
const client = require('./db-client');

//auth routes
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

// api data routes
app.get('/api/users', (req, res) => {
  client.query(`
    SELECT 
      g.id,
      g.user_id as "userId",
      g.description,
      g.completed 
      FROM goals g;

      SELECT
      u.id, 
      u.email
      FROM users u;
  `)
    .then(result => {
      const goals = result[0].rows;
      const users = result[1].rows;
      users.forEach(user => {
        user.goals = goals.filter(goal => {
          return goal.userId === user.id;
        });
      });
      res.send(users);
    })
    .catch(err => console.log(err));
});

app.get('/api/me/goals', (req, res) => {
  client.query(`
    SELECT 
      id,
      user_id as "userId", 
      description,
      completed
    FROM goals
    WHERE user_id = $1;
  `,
  [req.userId]
  )
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => console.log(err));
  
});

app.post('/api/me/goals', (req, res) => {
  console.log('posting');
  const body = req.body;

  client.query(`
    INSERT INTO goals (user_id, description, completed)
    VALUES ($1, $2, $3)
    RETURNING *, user_id as "userId";
  `,
  [req.userID, body.description, body.completed]
  )
    .then(result => {
      res.send(result.rows[0]);
    })
    .catch(err => console.log(err));
});

app.put('/api/me/goals', (req, res) => {
  const body = req.body;

  client.query(`
    update goals
    set
      description = $1,
      completed = $2,
    where id = $3,
    and user_id = $4
    returning *, user_id as "userId";
  `,
  [body.description, body.completed, req.params.id, req.userId]
  ).then(result => {
    res.send(result.rows[0]);
  });
});

app.get('/api/famous', (req, res) => {
  client.query(`
    SELECT *
    FROM famous;
  `)
    .then(result => {
      res.send(result.rows);
    });
});

app.listen(3000, () => console.log('app running...'));