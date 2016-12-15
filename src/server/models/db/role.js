const Sequelize = require('sequelize');
const db = require('./db');


const roleSchema = {
  role: {
    type: Sequelize.STRING,
  },
};
const roleConfig = {};

const Role = db.define('role', roleSchema, roleConfig);

module.exports = Role;
