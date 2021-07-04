'use strict';

const express = require('express');
const cors = require('cors');
const router = require('./auth/routes');

const notfoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', lifeProof);
app.get('/bad', badHandler);
app.use('/auth/v1/', router);

function lifeProof(req, res) {
  res.status(200).json('home route');
}

function badHandler(req, res) {
  throw new Error('some thing went wrong');
}

app.use('*', notfoundHandler);
app.use(errorHandler);

function start(port) {
  app.listen(port, () => console.log(`listening on port ${port}`));
}

module.exports = {
  app: app,
  start: start,
};
