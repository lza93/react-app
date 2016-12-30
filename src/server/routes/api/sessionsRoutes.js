const router = require('express').Router();
const User = require('../../models/db').models.user;
const whitelist = require('../../utils/whitelist');
const errorMaker = require('../../utils/errorMaker');

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

router.get('/me', (req, res, next) => {
  if (!req.session.userId) { return res.json(); }
  return User.findOne({ where: { id: req.session.userId } })
    .then((user) => {
      if (!user) { return res.send(errorMaker('no active session', 404)); }
      return res.json(user);
    })
    .catch(next);
});

router.delete('/', (req, res, next) => {
  req.session.userId = null;
  res.status(204).json();
});

module.exports = router;
