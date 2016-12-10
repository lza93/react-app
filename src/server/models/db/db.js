const Sequelize = require('sequelize');

// Setting up db URL
const dbURL = process.dbURL || 'postgres://localhost:5432/my-react-app';

// Defining custom logger
const logger = (query) => {
  console.log('\n---DB QUERY---\n', query, '\n---|||---\n');
};

const db = new Sequelize(dbURL, {
  logging: logger,
});

module.exports = db;
