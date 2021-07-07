require('dotenv').config();

//basic express app
const express = require('express');
const app = express();

// superagent client AJAX library for calling 3rd party APIs
// const request = require('superagent');

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
    SELECT id, email, password
    FROM users
    WHERE email = $1
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


app.post('/api/goals', (req, res, next) => {
  const body = req.body;
  if(body.name === 'error') return next('bad name');
  client.query(`
    INSERT INTO goals (user_id, name, completed)
    VALUES ($1, $2, $3)
    returning *;
  `,
  [req.userId, body.name, body.completed]
  ).then(result => {
    res.send(result.rows[0]);
  })
    .catch(next);
});

app.put('/api/goals', (req, res, next) => {
  const body = req.body;
  if(body.name === 'error') return next('bad name');
  client.query(`
    UPDATE goals
    SET
      completed = $1
    WHERE id = $2
    AND user_id = $3
    RETURNING *;
  `,
  [body.completed, body.id, req.userId]
  ).then(result => {
    res.send(result.rows[0]);
  })
    .catch(next);
});


app.get('/api/goals', (req, res, next) => {
  client.query(`
    SELECT id, name, completed
    FROM goals
    WHERE user_id = $1
    ORDER BY id;
  `,
  [req.userId])
    .then(result => {
      res.send(result.rows);
    })
    .catch(next);
});

app.get('/api/users', (req, res) => { 
  client.query(`
    SELECT 
      g.id, 
      g.user_id as "userId", 
      g.name,
      g.completed 
    FROM goals g; 
    SELECT 
      u.id, 
      u.email 
    FROM users u;`
  ) .then(result => { 
    const goals = result[0].rows; 
    const users = result[1].rows; 
    users.forEach(user => { 
      user.goals = goals.filter(goal => { 
        return goal.userId === user.id; 
      }); 
    }); res.send(users);
  }) 
    .catch(err => console.log(err)); });

// app.get('/api/users', (req, res, next) => {
//   client.query(`
//   SELECT 
//     u.email,
//     g.name
//   FROM users as u
//   LEFT JOIN goals as g
//   ON g.user_id = u.id;
//   `)
//     .then(result => {
//       res.send(result.rows)
//     })
//     .catch(next)
// })


const PORT = process.env.PORT;
app.listen(PORT, () => console.log('server humming along on port', PORT));

