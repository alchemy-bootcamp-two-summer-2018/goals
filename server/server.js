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
  [email])
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

app.get('/api/me/goals', (req, res) => {
  client.query(`
    SELECT
      id,
      goal,
      complete,
      user_id as "userID"
      FROM goals g
      WHERE user_id = $1
      ORDER BY id;
  `,
  [req.userId]
  )
    .then(result => {
      console.log(result);
      res.send(result.rows);
    })
    .catch(err => console.log(err));
});

app.post('/api/me/goals', (req, res, next) => {
  const body = req.body;
  if(body.name === 'error') return next('bad name');

  client.query(`
    INSERT INTO goals (goal, user_id)
    values ($1, $2)
    returning *, user_id as "userID";
  `,
  [body.goal, req.userId]
  ).then(result => {
    res.send(result.rows[0]);
  })
    .catch(next);
});

app.put('/api/me/goals', (req, res, next) => {
  const body = req.body;

  client.query(`
    UPDATE goals
    SET
      goal = $2,
      complete = $3,
      user_id = $4
    WHERE id = $1
    returning *, user_id as "userId";
  `,
  [body.id, body.goal, body.complete, req.userId]
  ).then(result => {
    res.send(result.rows[0]);
  })
    .catch(next);
});

app.get('/api/users', (req, res) => {
  client.query(`
  SELECT
    g.id,
    g.goal,
    g.complete,
    g.user_id as "userId"
    FROM goals g;

    SELECT
    u.id,
    u.email
    FROM users u;
  `)
    .then(result => {
      const goals = result[0].rows;
      const users = result[1].rows;
      users.forEach(user => {
        user.goals = goals.filter(goal => {
          return goal.userId === user.id;
        });
      });
      res.send(users);
    })
    .catch(err => console.log(err));
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log('server running on port', PORT));