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

// routes
app.get('/api/cities', (req, res) => {
  client.query(`
    SELECT
      c.id,
      c.name,
      s.id as "stateId",
      s.name as state
    FROM cities as c
    JOIN states as s
    ON c.state_id = s.id
    ORDER BY c.name;
  `)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => console.log(err));
});

app.get('/api/cities/:id', (req, res) => {
  client.query(`
    SELECT
      id,
      name,
      state_id as "stateId",
      population,
      landlocked
    FROM cities
    WHERE id = $1;
  `,
  [req.params.id]
  )
    .then(result => {
      res.send(result.rows[0]);
    })
    .catch(err => console.log(err));
});

app.post('/api/cities', (req, res) => {
  console.log('posting');
  const body = req.body;

  client.query(`
    INSERT INTO cities (name, state_id, population, landlocked)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `,
  [body.name, body.stateId, body.population, body.landlocked]
  )
    .then(result => {
      res.send(result.rows[0]);
    })
    .catch(err => console.log(err));
});

app.put('/api/cities/:id', (req, res) => {
  console.log('updating');
  const body = req.body;

  client.query(`
    UPDATE cities 
    SET 
      name=$1, 
      state_id=$2, 
      population=$3, 
      landlocked=$4
    WHERE id = $5
    RETURNING *;
  `,
  [body.name, body.stateId, body.population, body.landlocked, req.params.id]
  )
    .then(result => {
      res.send(result.rows[0]);
    })
    .catch(err => console.log(err));
});

app.delete('/api/cities/:id', (req, res) => {
  console.log('deleting');

  client.query(`
    DELETE FROM cities 
    WHERE id = $1;
  `,
  [req.params.id]
  )
    .then(() => {
      res.send({ removed: true });
    })
    .catch(err => console.log(err));
});

app.get('/api/states', (req, res) => {
  client.query(`
    SELECT *
    FROM states;
  `)
    .then(result => {
      res.send(result.rows);
    });
});



// start "listening" (run) the app (server)
const PORT = 3000;
app.listen(PORT, () => console.log('app running on', PORT));