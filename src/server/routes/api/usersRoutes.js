const router = require('express').Router();
const User = require('../../models/db').models.user;
const Auth = require('../middleware/authMiddleware');

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
      res.json(user);
    })
    .catch(next);
});

router.use(Auth.isLoggedIn);
router.use(Auth.hasRole('admin'));
router.get('/', (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});

module.exports = router;
