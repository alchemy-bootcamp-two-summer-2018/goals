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
  console.log('hi im working', res);
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

 


const PORT = process.env.PORT;
app.listen(PORT, () => console.log('server running on port', PORT));