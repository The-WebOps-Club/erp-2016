'use strict';

var express = require('express');
var controller = require('./upload.controller');

var router = express.Router();


router.get('/:name', controller.serve);
router.post('/', controller.create);

module.exports = router;