'use strict';

var express = require('express');
var controller = require('./upload.controller');

var router = express.Router();


router.get('/:filename', controller.serve);
router.post('/', controller.create);

module.exports = router;