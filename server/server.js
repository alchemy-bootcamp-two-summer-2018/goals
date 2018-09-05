require('dotenv').config();


// express for serving, morgan for logging, cors for cors, request for client AJAX lib for calling 3rd party APIs
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const request = require('superagent');

// initialize all three, plus express.json for reading json body
const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


// server files in public directory
app.use(express.static('public'));

// connect to database
const client = require('./db-client');

// auth routes

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

// goals
app.get('/api/me/goals', (req, res, next) => {
  client.query(`
    SELECT 
      id,
      user_id as "userId",
      is_completed as "isCompleted",
      description
    FROM goals 
    WHERE user_id=$1;
  `,
  [req.params.id]
  ).then((result) => {
    res.send(result.rows);
  })
    .catch(next);
});
app.post('/api/me/goals', (req, res, next) => {
  const body = req.body;

  client.query(`
    INSERT INTO goals (user_id, is_completed, description)
    VALUES ($1, $2, $3)
    RETURNING *;
  `,
  [body.userId, body.isCompleted, body.description]
  ).then(result => {
    res.send(result.rows[0]);
  })
    .catch(next);
});
app.put('/api/me/goals', (req, res, next) => {
  const body = req.body;

  client.query(`
    update goals
    set
      is_completed = $1,
      description = $2
    where id = $3,
    and user_id = $4
    returning *, goals_id as "goalId";
  `,
  [body.isCompleted, body.description, req.params.id, req.userId]
  ).then(result => {
    res.send(result.rows[0]);
  })
    .catch(next);
});
app.delete('/api/me/goals', (req, res, next) => {
  client.query(`
    delete from goals where id=$1;
  `,
  [req.params.id]
  ).then(() => {
    res.send({ removed: true });
  })
    .catch(next);
});

// users
app.get('/api/users', (req, res, next) => {

  client.query(`
    SELECT 
      u.id, u.email,
      count(g.id) as "goalCount"
    FROM users u 
    JOIN goals g
    on u.id = g.user_id
    group by u.id
    order by u.email;
  `)
    .then(result => {
      res.send(result.rows);
    })
    // we don't need the wrapper function:
    // .catch(err => {
    //   next(err);
    // });
    // we can just pass next _as_ the error callback function:
    .catch(next);
});


// start "listening" (run) the app (server)
const PORT = process.env.PORT;
app.listen(PORT, () => console.log('app running on', PORT));