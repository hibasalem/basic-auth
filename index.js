'use strict';

require(`dotenv`).config();
const server = require('./src/server');
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    server.start(process.env.PORT || 3000);
  })
  .catch((e) => {
    console.error('can not connect', e.massage);
  });
