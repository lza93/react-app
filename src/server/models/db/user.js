const Sequelize = require('sequelize');
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

};

const User = db.define('user', userSchema, userConfig);

module.exports = User;
