const express = require('express');
const router = require('./src/server/routes');
const configureAppVariables = require('./src/config/appVariables');
const db = require('./src/server/models/db');

const app = express();

configureAppVariables(app);

app.listen(app.get('PORT'), () => {
  console.log('We are listening on port', app.get('PORT'));
  db.authenticate()
    .then(() => console.log('db is authenicated'))
    .catch(err => console.log(err.message));
});

app.use(router);

app.get('/*', (req, res) => res.sendFile(app.get('indexHTML')));

app.use(require('./src/server/routes/utils/errorCatcher'));
