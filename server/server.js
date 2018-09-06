require('dotenv').config();

const express = require('express');
const app = express();

//const request = require('superagent');

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

app.post('/api/auth/signIn', (req, res) => {
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

// app.use((req, res, next) => {
//   // is there a Authorization header?
//   const id = req.get('Authorization');
//   if(!id) {
// no - send an error
//     res.status(403).send({
//       error: 'No token found'
//     });
//     return;
//   }

//   // 1. set req.userId to the header
//   req.userId = id;
//   // 2. call next()
//   next();
// });

// api data routes
app.get('/api/goals', (req, res, next) => {

  client.query(`
    select id, 
      name, 
      complete,
      user_id as "userId" 
    FROM goals
    order by name;
  `).then(result => {
    res.send(result.rows);
  })
    .catch(next);

});


// app.put('/api/dogs/:id', (req, res, next) => {
//   const body = req.body;

//   client.query(`
//     update dogs
//     set
//       name = $1,
//       personality_id = $2,
//       weight = $3,
//       age = $4,
//     where id = $5,
//     and user_id = $6
//     returning *, personality_id as "personalityId";
//   `,
//   [body.name, body.personalityId, body.weight, body.age, 
//     req.params.id, req.userId]
//   ).then(result => {
//     res.send(result.rows[0]);
//   })
//     .catch(next);
// });

// app.delete('/api/dogs/:id', (req, res, next) => {
//   client.query(`
//     delete from dogs where id=$1;
//   `,
//   [req.params.id]
//   ).then(() => {
//     res.send({ removed: true });
//   })
//     .catch(next);
// });

// app.get('/api/personalities', (req, res, next) => {

//   client.query(`
//     select 
//       q.id, q.name, q.weight,
//       count(n.id) as "dogCount",
//       avg(n.age) as "ageAvg "
//     from personalities q
//     left join personalities n
//     on q.id = n.personality_id
//     group by q.id
//     order by q.name;
//   `)
//     .then(result => {
//       res.send(result.rows);
//     })
// we don't need the wrapper function:
// .catch(err => {
//   next(err);
// });
// we can just pass next _as_ the error callback function:
//     .catch(next);
// });

// app.get('/api/personalities/:id', (req, res, next) => {

//   const personalityPromise = client.query(`
//     select id, name, direction
//     from personalities q
//     where q.id = $1;
//   `,
//   [req.params.id]);

//   const personalitiesPromise = client.query(`
//     select id, name, description
//     from personalities
//     where personality_id = $1;
//   `,
//   [req.params.id]);

//   Promise.all([personalityPromise, personalitiesPromise])
//     .then(promiseValues => {
//       const personalityResult = promiseValues[0];
//       const personalitiesResult = promiseValues[1];

//       if(personalityResult.rows.length === 0) {
//         res.sendStatus(404);
//         return;
//       }

//       const personality = personalityResult.rows[0];
//       const personalities = personalitiesResult.rows;
//       quadrant.personalities = personalities;

//       res.send(personality);
//     })
//     .catch(next);
// });

// app.get('/api/restaurants', (req, res, next) => {
//   request.get(`${process.env.RESTAURANTS_API}/restaurant-inspections/`)
//     .then(result => {
//       res.send(result.body.results.map(rest => {
//         return {
//           address: rest.address,
//           name: rest.name,
//           inspectionNumber: rest.inspection_number
//         };
//       }));
//     })
//     .catch(next);
// });


// start "listening" (run) the app (server)
const PORT = process.env.PORT;
app.listen(PORT, () => console.log('server running on port', PORT));