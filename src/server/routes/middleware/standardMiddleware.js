const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const rootPath = path.join(__dirname, '../../../');

console.log("THIS IS", rootPath);
router.use(express.static(rootPath + '/client/assets'));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

module.exports = router;