const Sequelize = require('sequelize');

// Defining custom logger
const logger = (query) => {
  console.log('\n---DB QUERY---\n', query, '\n---|||---\n');
};

const db = new Sequelize(process.env.DATABASE_URL, {
  logging: process.env.NODE_ENV === 'test' ? false : logger,
});

module.exports = db;
