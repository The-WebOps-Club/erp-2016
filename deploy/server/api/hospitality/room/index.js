'use strict';

var express = require('express');
var controller = require('./room.controller');
var auth = require('../../../auth/auth.service');
var router = express.Router();

router.get('/', controller.index);
router.get('/:id',auth.hasRole('admin'), controller.show);
router.post('/', auth.hasRole('admin'),controller.create);
router.get('/all', controller.indexRoomAvailibility);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id',auth.hasRole('admin'), controller.destroy);

module.exports = router;