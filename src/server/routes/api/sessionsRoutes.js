const router = require('express').Router();
const User = require('../../models/db').models.user;

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
      res.json(user);
    })
    .catch(next);
});

module.exports = router;
