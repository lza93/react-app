const express = require('express');
const usersRoutes = require('./usersRoutes');
const sessionsRoutes = require('./sessionsRoutes');

const router = express.Router();
router.use((req, res, next) => {
  console.log('got to the /api route');
  next();
});

router.use('/users', usersRoutes);
router.use('/sessions', sessionsRoutes);


module.exports = router;
