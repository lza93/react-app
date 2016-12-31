const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const appConfig = require('../../../config/appConfig');

const router = express.Router();
const rootPath = appConfig.rootPath;

router.use(session(
  {
    secret: appConfig.sessionSecret,
    resave: false,
    saveUninitialized: true,
  }));

router.use(express.static(`${rootPath}/client/assets`));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

module.exports = router;
