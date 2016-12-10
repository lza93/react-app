const express = require('express');
const router = require('./src/server/routes');
const configureAppVariables = require('./src/config/appVariables');

const app = express();

configureAppVariables(app);

app.listen(app.get('PORT'), () => {
  console.log('We are listening on port', app.get('PORT'));
});

app.use(router);

app.get('/*', (req, res) => res.sendFile(app.get('indexHTML')));

app.use(require('./src/server/routes/utils/errorCatcher'));
