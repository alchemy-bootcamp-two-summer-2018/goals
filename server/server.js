require('dotenv').config();

const express = require('express');
const app = express();

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
      error: 'Please enter an email and password.'
    });
    return;
  }

  client.query(`
    SELECT count(*)
    FROM users
    WHERE email = $1
  `,
  [email])
    .then(results => {
      if(results.rows[0].count > 0) {
        res.status(400).send({ error: 'already a user with this address' });
        return;
      }
    
      client.query(`
        INSERT INTO users (email, password)
        VALUES ($1, $2)
        RETURNING id, email
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
      error: 'Please enter an email and password.'
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
        res.status(401).send({ error: 'incorrect email and/or password' });
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

app.get('/api/me/goals', (req, res, next) => {
  client.query(`
    SELECT * FROM goals
    WHERE user_id = $1;     
  `,
  [req.userId])
    .then(results => {
      res.send(results.rows);
    })
    .catch(next);
});

app.post('/api/me/goals', (req, res, next) => {
  const body = req.body;
  if(body.name === 'error') return next('name was no good');

  client.query(`
    INSERT INTO goals (user_id, name, completed)
    VALUES ($1, $2, $3)
    RETURNING *;
  `,
  [req.userId, body.name, body.completed]
  ).then(result => {
    res.send(result.rows[0]);
  })
    .catch(next);
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log('server running on port', PORT));

app.put('/api/me/goals', (req, res, next) => {
  const body = req.body;
  client.query(`
    UPDATE goals
    SET
      name = $1,
      completed = $2
    WHERE id = $3
    AND user_id = $4
    RETURNING *;
  `,
  [body.name, body.completed, req.params.id, req.userId]  
  ).then(result => {
    res.send(result.rows[0]);
  })
    .catch(next);
});

app.get('/api/users', (req, res, next) => {
  client.query(`
    SELECT 
      u.email, 
      u.id, 
      g.user_id as "userId",
      g.name,
      g.completed
      from users u
      join goals g
      on u.id = g.user_id
      order by u.email;      
  `)
    .then(result => {
      res.send(result.rows);
    })
    .catch(next);
});