const path = require('path');

const environmentSettings = require(`./${process.env.NODE_ENV}.config`); // eslint-disable-line

// Setup testing dbURL
if (process.env.NODE_ENV === 'test') {
  process.dbURL = 'postgres://localhost:5432/my-react-app-test';
}

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const rootPath = path.join(__dirname, '../');
const indexHTML = `${rootPath}/client/index.html`;
const port = process.env.PORT || 3001;

module.exports = Object.assign({
  indexHTML,
  rootPath,
  port,
}, {});
