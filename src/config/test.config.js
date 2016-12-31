console.log('loading testing config');

process.env.DATABASE_URL = 'postgres://localhost:5432/my-react-app-test';
process.env.PORT = 3001;


module.exports = {
  sessionSecret: 'this is the test environment secret',
};
