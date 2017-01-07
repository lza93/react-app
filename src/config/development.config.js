console.log('loading development config');

process.env.DATABASE_URL = 'postgres://localhost:5432/my-react-app';
process.env.PORT = 3001;

module.exports = {
  SESSION_SECRET: 'this is the development environment secret',
};
