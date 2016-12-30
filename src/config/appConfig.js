const path = require('path');

// Setup testing dbURL
if (process.env.NODE_ENV === 'test') {
  process.dbURL = 'postgres://localhost:5432/my-react-app-test';
}

const rootPath = path.join(__dirname, '../');
const indexHTML = `${rootPath}/client/index.html`;
const port = process.env.PORT || 3001;

module.exports = {
  indexHTML,
  rootPath,
  port,
};
