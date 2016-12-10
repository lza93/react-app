// change this and modify for more extensive error handling

module.exports = function (err, req, res, next) {
  console.error(err.message); // eslint-disable-line
  console.error(err.stack); // eslint-disable-line
  res.status(err.status || 500).send(err.message || 'Internal server error.');
};
