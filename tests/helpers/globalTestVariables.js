require('babel-register')();
require('../../src/config/appConfig');

const jsdom = require('jsdom');

global.navigator = {
  userAgent: 'node.js',
};

// global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
// global.window = document.defaultView;
