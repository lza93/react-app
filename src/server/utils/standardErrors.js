const errorMaker = require('./errorMaker');

const unauthorized = errorMaker('unauthorized', 401);
const notLoggedIn = errorMaker('not logged in', 403);
const notFound = errorMaker('not found', 404);

module.exports = {
  notFound,
  notLoggedIn,
  unauthorized,
};
