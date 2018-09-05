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

app.use(express.static('public'));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log('server running on port', PORT));
