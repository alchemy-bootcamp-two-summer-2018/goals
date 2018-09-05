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

const PORT = process.env.PORT;
app.listen(PORT, () => console.log('server running on port', PORT));

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