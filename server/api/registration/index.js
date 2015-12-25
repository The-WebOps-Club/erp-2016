'use strict';

var express = require('express');
var controller = require('./registration.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/:id', auth.hasRole('user'), controller.show);
router.get('/event/:eventId', auth.hasRole('coord'), controller.showforevent);
router.post('/', auth.hasRole('user'), controller.create);
router.post('/toggleTDP/:id', auth.hasRole('coord'), controller.toggleTDP);
router.put('/:id', auth.hasRole('user'), controller.update);
router.patch('/:id', auth.hasRole('user'), controller.update);
router.delete('/:teamId/:eventId', auth.hasRole('user'), controller.destroy);

module.exports = router;