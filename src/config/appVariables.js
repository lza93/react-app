const path = require('path');

const rootPath = path.join(__dirname, '../');

module.exports = (app) => {
  app.set('rootPath', rootPath);
  app.set('indexHTML', `${rootPath}/client/index.html`);
  app.set('PORT', process.env.PORT || 3001);
};
