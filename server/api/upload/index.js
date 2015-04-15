'use strict';

var express = require('express');
var controller = require('./upload.controller');

var router = express.Router();


router.get('/*', controller.serve);
router.post('/', controller.create);

module.exports = router;