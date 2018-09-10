require('dotenv').config();

// basic express app
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
  
// api data routes
app.get('/api/neighborhoods', (req, res, next) => {
  
  client.query(`
      select id, 
        name, 
        user_id as "userId", 
        description, 
      order by name;
    `).then(result => {
    res.send(result.rows);
  })
    .catch(next);
  
});
  
app.post('/api/goals', (req, res, next) => {
  const body = req.body;
  if(body.name === 'error') return next('bad name');
    
  client.query(`
      insert into goals (user_id, name, description)
      values ($1, $2, $3)
      returning *, user_id as "userId";
    `,
  [req.userId, body.name, body.userId, body.description]
  ).then(result => {
    // send back object
    res.send(result.rows[0]);
  })
    .catch(next);
});
  
app.put('/api/goals/:id', (req, res, next) => {
  const body = req.body;
  
  client.query(`
      update goals
      set
        name = $1,
        user_id = $2,
        description = $3
      where id = $4,
      and user_id = $5
      returning *, user_id as "userId";
    `,
  [body.name, body.userId, body.description, req.params.id, req.userId]
  ).then(result => {
    res.send(result.rows[0]);
  })
    .catch(next);
});
  
app.delete('/api/goals/:id', (req, res, next) => {
  client.query(`
      delete from goals where id=$1;
    `,
  [req.params.id]
  ).then(() => {
    res.send({ removed: true });
  })
    .catch(next);
});
  
app.get('/api/users', (req, res, next) => {
  
  client.query(`
      select 
        u.id, u.name, u.password,
        count(n.id) as "goalCount",
      from users u
      left join goals g
      on u.id = g.user_id
      group by u.id
      order by u.name;
    `)
    .then(result => {
      res.send(result.rows);
    })

    .catch(next);
});
  
app.get('/api/users/:id', (req, res, next) => {
  
  const userPromise = client.query(`
      select id, name, direction
      from quadrants u
      where u.id = $1;
    `,
  [req.params.id]);
  
  const goalsPromise = client.query(`
      select id, name, description
      from neighborhoods
      where user_id = $1;
    `,
  [req.params.id]);
  
  Promise.all([userPromise, goalsPromise])
    .then(promiseValues => {
      const userResult = promiseValues[0];
      const goalsResult = promiseValues[1];
  
      if(userResult.rows.length === 0) {
        res.sendStatus(404);
        return;
      }
  
      const user = userResult.rows[0];
      const goals = goalsResult.rows;
      user.neighborhoods = users;
  
      res.send(user);
    })
    .catch(next);
});
  


// start "listening" (run) the app (server)
const PORT = process.env.PORT;
app.listen(PORT, () => console.log('server running on port', PORT));