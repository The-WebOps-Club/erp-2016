'use strict';

var express = require('express');
var controller = require('./marqueeNotif.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/:eventId', auth.hasRole('coord'), controller.create);
router.put('/:id', auth.hasRole('coord'), controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;