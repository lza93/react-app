const path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const environmentSettings = require(`./${process.env.NODE_ENV}.config`); // eslint-disable-line


const rootPath = path.join(__dirname, '../');
const indexHTML = `${rootPath}/client/index.html`;
const port = process.env.PORT;

module.exports = Object.assign({
  indexHTML,
  rootPath,
  port,
}, environmentSettings);
