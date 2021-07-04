'use strict';

const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
// let SALT_WORK_FACTOR = 5;

const usersSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// //  from  mongoDb blog

// usersSchema.pre('save', function (next) {
//   var user = this;

//   // only hash the password if it has been modified (or is new)
//   if (!user.isModified('password')) return next();

//   // generate a salt
//   bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
//     if (err) return next(err);

//     // hash the password using our new salt
//     bcrypt.hash(user.password, salt, function (err, hash) {
//       if (err) return next(err);
//       // override the cleartext password with the hashed one
//       user.password = hash;
//       next();
//     });
//   });
// });

// usersSchema.methods.comparePassword = function (candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });
// };

const UsersModel = mongoose.model('users', usersSchema);

module.exports = UsersModel;
