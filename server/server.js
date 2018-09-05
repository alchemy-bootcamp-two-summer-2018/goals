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
app.get('/api/neighborhoods', (req, res, next) => {

  client.query(`
    select id, 
      name, 
      quadrant_id as "quadrantId", 
      description, 
      population, 
      founded
    from neighborhoods
    order by name;
  `).then(result => {
    res.send(result.rows);
  })
    .catch(next);

});

app.post('/api/neighborhoods', (req, res, next) => {
  const body = req.body;
  if(body.name === 'error') return next('bad name');
  
  client.query(`
    insert into neighborhoods (user_id, name, quadrant_id, population, founded, description)
    values ($1, $2, $3, $4, $5, $6)
    returning *, quadrant_id as "quadrantId";
  `,
  [req.userId, body.name, body.quadrantId, body.population, body.founded, body.description]
  ).then(result => {
    // send back object
    res.send(result.rows[0]);
  })
    .catch(next);
});

app.put('/api/neighborhoods/:id', (req, res, next) => {
  const body = req.body;

  client.query(`
    update neighborhoods
    set
      name = $1,
      quadrant_id = $2,
      population = $3,
      founded = $4,
      description = $5
    where id = $6,
    and user_id = $7
    returning *, quadrant_id as "quadrantId";
  `,
  [body.name, body.quadrantId, body.population, body.founded, 
    body.description, req.params.id, req.userId]
  ).then(result => {
    res.send(result.rows[0]);
  })
    .catch(next);
});

app.delete('/api/neighborhoods/:id', (req, res, next) => {
  client.query(`
    delete from neighborhoods where id=$1;
  `,
  [req.params.id]
  ).then(() => {
    res.send({ removed: true });
  })
    .catch(next);
});

app.get('/api/quadrants', (req, res, next) => {

  client.query(`
    select 
      q.id, q.name, q.direction,
      count(n.id) as "neighborhoodCount",
      avg(n.population) as "populationAvg "
    from quadrants q
    left join neighborhoods n
    on q.id = n.quadrant_id
    group by q.id
    order by q.name;
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

app.get('/api/quadrants/:id', (req, res, next) => {

  const quadrantPromise = client.query(`
    select id, name, direction
    from quadrants q
    where q.id = $1;
  `,
  [req.params.id]);

  const neighborhoodsPromise = client.query(`
    select id, name, description
    from neighborhoods
    where quadrant_id = $1;
  `,
  [req.params.id]);

  Promise.all([quadrantPromise, neighborhoodsPromise])
    .then(promiseValues => {
      const quadrantResult = promiseValues[0];
      const neighborhoodsResult = promiseValues[1];

      if(quadrantResult.rows.length === 0) {
        res.sendStatus(404);
        return;
      }

      const quadrant = quadrantResult.rows[0];
      const neighborhoods = neighborhoodsResult.rows;
      quadrant.neighborhoods = neighborhoods;

      res.send(quadrant);
    })
    .catch(next);
});

app.get('/api/restaurants', (req, res, next) => {
  request.get(`${process.env.RESTAURANTS_API}/restaurant-inspections/`)
    .then(result => {
      res.send(result.body.results.map(rest => {
        return {
          address: rest.address,
          name: rest.name,
          inspectionNumber: rest.inspection_number
        };
      }));
    })
    .catch(next);
});

app.post('/api/me/goals', (req, res, next) => {
  const body = req.body;
  if(body.name === 'error') return next('bad name');

  client.query(`
    insert into goals (user_id, name, description, completed)
    values ($1, $2, $3, $4)
    returning *, user_id as "userId";
  `,
  [req.userId, body.name, body.description, body.completed]
  ).then(result => {
    // send back object
    res.send(result.rows[0]);
  })
    .catch(next);
});


// app.put('/api/me/goals', (req, res, next) => {
//   const body = req.body;

//   client.query(`
//     update goals
//     set
//       name = $1,
//       description = $2,
//       completed = $3
//     where id = $4,
//     and user_id = $5
//     returning *, user_id as "userId";
//   `,
//   [body.name, body.description, body.completed, req.params.id, req.userId]
//   ).then(result => {
//     res.send(result.rows[0]);
//   })
//     .catch(next);
// });

app.put('/api/me/goals', (req, res) => {
  console.log('posting');
  const body = req.body;
  client.query(`
    UPDATE goals
    SET name = $2, 
      description = $3, 
      completed = $4, 
      user_id = $5
    WHERE id = $1
    RETURNING *;
  `,
  [body.id, body.name, body.description, body.completed, body.user_id]
  )
    .then(result => {
      res.send(result.rows[0]);
    })
    .catch(err => console.log(err));
  
});

app.get('/api/me/goals', (req, res, next) => {

  client.query(`
    select 
      id, 
      name, 
      user_id as "userId", 
      description, 
      completed
    from goals
    where user_id = $1
    order by name;
  `,
  [req.userId]
  )
    .then(result => {
      res.send(result.rows);
    })
    .catch(next);
});

app.get('/api/users', (req, res, next) => {

  client.query(`
    select 
      g.id, g.name, g.description, g.completed
    from goals g
    join users u
    on u.id = g.user_id
    group by g.id
    order by g.name;
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
app.listen(PORT, () => console.log('server running on port', PORT));