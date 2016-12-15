const router = require('express').Router();
const User = require('../../models/db').models.user;
const whitelist = require('../utils/whitelist');

router.use((req, res, next) => {
  console.log('got to /api/sessions routes');
  next();
});

router.post('/', (req, res, next) => {
  let user;
  User.findOne({ where: { email: req.body.email } })
    .then((foundUser) => {
      if (!foundUser) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
      }
      user = foundUser;
      return user.checkPassword(req.body.password);
    })
    .then((correctPassword) => {
      if (!correctPassword) {
        const err = new Error('Incorrect Password');
        err.status = 401;
        throw err;
      }
      req.session.userId = user.id;
      res.json(whitelist(user, ['id', 'email', 'username']));
    })
    .catch(next);
});

router.delete('/', (req, res, next) => {
  req.session.userId = null;
  res.status(204).json();
});

module.exports = router;
