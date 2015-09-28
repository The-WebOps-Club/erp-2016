'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config/environment');
var Visitor = require('../api/visitor/visitor.model');

// Passport Configuration
require('./facebook/passport').setup(Visitor, config);
require('./google/passport').setup(Visitor, config);

var router = express.Router();

router.use('/facebook', require('./facebook'));
router.use('/google', require('./google'));

module.exports = router;