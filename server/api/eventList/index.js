'use strict';

var express = require('express');
var controller = require('./eventList.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('superCoord'), controller.create);
router.put('/:id', auth.hasRole('superCoord'), controller.update);
router.patch('/:id', auth.hasRole('superCoord'), controller.update);
router.delete('/:id', auth.hasRole('superCoord'), controller.destroy);

module.exports = router;