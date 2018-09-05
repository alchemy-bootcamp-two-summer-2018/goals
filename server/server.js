require('dotenv').config();

//basic express app
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

app.post('/api/goals', (req, res, next) => {
    const body = req.body;
    if(body.name === 'error') return next('bad name');

    client.query(`
        insert into goals (name)
        values ($1)
        returning *;
    `,
    [body.name]
    ).then(result => {
        res.send(result.rows[0]);
    })
        .catch(next);
});



const PORT = process.env.PORT;
app.listen(PORT, () => console.log('server humming along on port', PORT));