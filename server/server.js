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

// routes
app.get('/api/celebrities', (req, res) => {
  client.query(`
    SELECT 
      c.id,
      c.name, 
      f.id as "fameId",
      f.name as occupation
      FROM celebrities as c
      JOIN famous as f
      ON c.fame_id = f.id
      ORDER BY c.name
  `)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => console.log(err));
});

app.get('/api/celebrities/:id', (req, res) => {
  client.query(`
    SELECT 
      id,
      name,
      fame_id as "fameId", 
      gender,
      age,
      tool,
      description
    FROM celebrities
    WHERE id = $1;
  `,
  [req.params.id]
  )
    .then(result => {
      res.send(result.rows[0]);
    })
    .catch(err => console.log(err));
  
});

app.post('/api/celebrities', (req, res) => {
  console.log('posting');
  const body = req.body;

  client.query(`
    INSERT INTO celebrities (name, fame_id, gender, age, tool, description)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `,
  [body.name, body.fameId, body.gender, body.age, body.tool, body.description]
  )
    .then(result => {
      res.send(result.rows[0]);
    })
    .catch(err => console.log(err));
});

app.put('/api/celebrities/:id', (req, res) => {
  const body = req.body;

  client.query(`
    update celebrities
    set
      name = $1,
      fame_id = $2,
      gender = $3,
      age = $4,
      tool = $5,
      description = $6
    where id = $7
    returning *;
  `,
  [body.name, body.fameId, body.gender, body.age, body.tool, body.description, req.params.id]
  ).then(result => {
    res.send(result.rows[0]);
  });
});

app.delete('/api/celebrities/:id', (req, res) => {
  client.query(`
    delete from celebrities where id=$1;
  `,
  [req.params.id]
  ).then(() => {
    res.send({ removed: true });
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