'use strict';

var express = require('express');
var auth = require('../../auth/auth.service');
var controller = require('./upload.controller');

var router = express.Router();


router.get('/:id/:filename', controller.serve);
router.post('/', auth.isAuthenticated(), controller.sponsUpload);
router.post('/sponsImages', auth.isAuthenticated(), controller.sponsUpload);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
