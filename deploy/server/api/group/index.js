'use strict';

var express = require('express');
var auth = require('../../auth/auth.service');
var controller = require('./group.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.post('/makeWalls', auth.hasRole('admin'), controller.makeWalls);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;