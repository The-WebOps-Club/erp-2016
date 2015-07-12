'use strict';

var express = require('express');
var controller = require('./notification.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.post('/refresh', auth.isAuthenticated(), controller.refresh);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.get('/:id/seen', controller.markAsSeen);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;