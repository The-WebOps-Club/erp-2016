'use strict';

var express = require('express');
var auth = require('../../auth/auth.service');
var controller = require('./upload.controller');

var router = express.Router();


router.get('/:id/:filename', controller.serve);
router.post('/', auth.isAuthenticated(), controller.create);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;