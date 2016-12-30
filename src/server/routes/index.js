const express = require('express');
const Auth = require('./middleware/authMiddleware');
const standardMiddleware = require('./middleware/standardMiddleware');
const apiRoutes = require('./api');
const extensionCatcher = require('./middleware/extensionCatcher');

const router = express.Router();

router.use(standardMiddleware);
router.use(Auth.setUser);

router.use('/api', apiRoutes);
router.use(extensionCatcher);

module.exports = router;
