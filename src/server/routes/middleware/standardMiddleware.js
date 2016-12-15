const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');


const router = express.Router();
const rootPath = path.join(__dirname, '../../../');

router.use(session(
  {
    secret: 'shhhh!-changethis',
    resave: false,
    saveUninitialized: true,
  }));

router.use(express.static(`${rootPath}/client/assets`));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

module.exports = router;
