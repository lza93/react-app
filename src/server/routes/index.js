const express = require('express');

const router = express.Router();

router.use(require('./middleware/standardMiddleware'));
router.use('/api', require('./api'));
router.use(require('./middleware/extensionCatcher'));

module.exports = router;
