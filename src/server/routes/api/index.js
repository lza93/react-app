const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  console.log('got to the /api route');
  next();
})

module.exports = router;
