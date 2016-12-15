module.exports = function (errorMessage, statusCode) {
  const err = new Error(errorMessage || 'An error occured');
  err.status = statusCode || 500;
  return err;
};
