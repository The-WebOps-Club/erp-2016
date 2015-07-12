'use strict';

var express = require('express');
<<<<<<< HEAD
=======
var auth = require('../../auth/auth.service');
>>>>>>> master
var controller = require('./upload.controller');

var router = express.Router();


<<<<<<< HEAD
router.get('/:id', controller.serve);
router.post('/', controller.create);
router.delete('/:id', controller.destroy);
=======
router.get('/:id/:filename', controller.serve);
router.post('/', auth.isAuthenticated(), controller.create);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);
>>>>>>> master

module.exports = router;