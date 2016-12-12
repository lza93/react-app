const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('./db');

const userSchema = {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
};

const userConfig = {
  instanceMethods: {
    checkPassword(password) {
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, (err, isSamePassword) => {
          if (err) { return reject(err); }
          return resolve(isSamePassword);
        });
      });
    },
    hashPassword() {
      return new Promise((resolve, reject) =>
        bcrypt.hash(this.password, 4, (err, hash) => {
          if (err) { return reject(err); }
          this.password = hash;
          return resolve(hash);
        }));
    },
  },
  hooks: {
    beforeCreate: user => user.hashPassword(),
    beforeUpdate: (user) => { // eslint-disable-line
      if (user.changed('password')) {
        return user.hashPassword();
      }
      return 'password unchanged';
    },
  },
};

const User = db.define('user', userSchema, userConfig);

module.exports = User;
