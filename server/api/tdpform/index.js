'use strict';

var express = require('express');
var controller = require('./tdpform.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/:id', controller.show);
router.post('/', auth.hasRole('coord'), controller.create);
router.put('/:id', auth.hasRole('coord'), controller.update);
router.patch('/:id', auth.hasRole('coord'), controller.update);
router.delete('/:id', auth.hasRole('coord'), controller.destroy);

module.exports = router;