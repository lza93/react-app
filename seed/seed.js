const db = require('../src/server/models/db');
const User = db.models.user;

const runSeed = () => {
  console.log('Starting Seed');
  db.authenticate()
    .then(() => db.sync({ force: true }))
    .then(() => User.create({
      username: 'bb',
      email: 'bob@example.com',
      password: '123456',
    }))
    .then((user) => {
      return user.update({username: 'bob'});
    })
    .then((user) => {
      return user.checkPassword('12345s6');
    })
    .then((password) => {
      console.log('Successfully Seeded');
      process.exit(0);
    })
    .catch((err) => {
      console.log('UNSUCCESSFULL SEEDING!!!');
      console.log(err.message);
      process.exit(0);
    });
};

process.stdout.write(`You are about to reseed your database 
  and lose all changes made so far. Are you sure you want to do
  this? Type 'SEED' and press enter to continue
  >>`);
process.stdin.on('data', (data) => {
  const input = data.toString().trim();
  if (input === 'SEED') {
    runSeed();
  } else {
    process.stdout.write('Exiting without seeding');
    process.exit(0);
  }
});
