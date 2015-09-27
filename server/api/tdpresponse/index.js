'use strict';

var express = require('express');
var controller = require('./tdpresponse.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/all/:id', auth.hasRole('user'), controller.index);
router.get('/:team/:tdpform', auth.hasRole('coord'), controller.show);
router.post('/', auth.hasRole('user'), controller.create);
router.put('/:id', auth.hasRole('user'), controller.update);
router.put('/toggle/:id', auth.hasRole('user'), controller.toggle);
router.patch('/:id', auth.hasRole('user'), controller.update);
router.delete('/:id', auth.hasRole('user'), controller.destroy);

module.exports = router;