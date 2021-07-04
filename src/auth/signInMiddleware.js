'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
const UsersModel = require('./userSchema');

module.exports = async (req, res, next) => {
  let basicHeaderParts = req.headers.authorization.split(' '); // ['Basic', 'sdkjdsljd=']
  console.log('basicHeaderParts', basicHeaderParts);
  if (!basicHeaderParts[0] === 'Basic') next('Wrong Authorization headers');
  let encodedString = basicHeaderParts.pop(); // sdkjdsljd=
  let decodedString = base64.decode(encodedString); // "username:password"
  let [username, password] = decodedString.split(':'); // username, password
  console.log('decodedString', decodedString, username, password);

  try {
    const user = await UsersModel.findOne({ username: username });
    console.log('user', user);

    if (!user || !password) {
      res.status(403).json('Wrong User / password');
      // next('Wrong User / password');
      return;
    }
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      res.status(200).json(user);
    } else {
      throw new Error('Wrong User / password');
    }
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
