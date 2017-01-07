const config = require('../src/config/appConfig');
const db = require('../src/server/models/db');

db.sync({ force: true })
  .then(() => {
    console.log('db synced; now exiting');
    process.exit(0);
  });
