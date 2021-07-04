'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const UsersModel = require('./userSchema');
const router = express.Router();
const signIn = require('./signInMiddleware');

router.post('/signin', signIn, (req, res) => {
  res.status(200).json('user');
});

router.post('/signup', async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);

    const exist = await UsersModel.findOne({ username: req.body.username }); //null
    if (exist) throw new Error('user exist');

    const user = new UsersModel(req.body);
    const record = await user.save(req.body);
    res.status(201).json(record);
  } catch (e) {
    res.status(403).json('Error Creating User');
  }
});

module.exports = router;
