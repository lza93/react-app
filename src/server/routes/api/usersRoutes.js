const router = require('express').Router();
const User = require('../../models/db').models.user;
const Auth = require('../middleware/authMiddleware');
const whitelist = require('../utils/whitelist');

router.use((req, res, next) => {
  console.log('got to /api/users route');
  next();
});

router.post('/', (req, res, next) => {
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  User.create(newUser)
    .then((user) => {
      res.json(whitelist(user, ['id', 'username', 'email']));
    })
    .catch(next);
});

router.use(Auth.isLoggedIn);
router.use(Auth.hasRole('admin'));
router.get('/', (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.json(users.map(user => whitelist(user, ['id', 'username', 'email'])));
    })
    .catch(next);
});

module.exports = router;
