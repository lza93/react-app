const path = require('path');

const environmentSettings = require(`./${process.env.NODE_ENV}.config`); // eslint-disable-line

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const rootPath = path.join(__dirname, '../');
const indexHTML = `${rootPath}/client/index.html`;
const port = process.env.PORT;

module.exports = Object.assign({
  indexHTML,
  rootPath,
  port,
}, environmentSettings);
