'use strict';

var express = require('express');
var controller = require('./event.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/myEvents', auth.hasRole('coord'), controller.myEvents);
router.get('/showWeb/:id', controller.showWeb);
router.get('/:id', controller.show);
router.get('/getMultiple/:id', controller.getMultiple);
router.post('/', auth.hasRole('superCoord'), controller.create);
router.put('/:id', auth.hasRole('coord'), controller.update);
router.patch('/:id', auth.hasRole('coord'), controller.update);
router.patch('/toggleVisiblity/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('superCoord'), controller.destroy);

module.exports = router;