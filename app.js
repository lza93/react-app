const express = require('express');
const appConfig = require('./src/config/appConfig');
const db = require('./src/server/models/db'); // eslint-disable-line
const router = require('./src/server/routes');

const app = express();

app.listen(appConfig.port, () => {
  console.log('We are listening on port', appConfig.port); // eslint-disable-line
});

app.use(router);

app.get('/*', (req, res) => res.sendFile(appConfig.indexHTML));

app.use(require('./src/server/routes/middleware/errorCatcher'));
