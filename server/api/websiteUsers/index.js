'use strict';

var express = require('express');
var controller = require('./websiteUsers.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/updateProfile', auth.isAuthenticated(), controller.updateProfile);
router.patch('/:id/updateProfile', auth.isAuthenticated(), controller.updateProfile);
router.post('/forgotPassword', controller.forgotPassword);
router.post('/resetPassword/:token', controller.resetPassword);
// router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;