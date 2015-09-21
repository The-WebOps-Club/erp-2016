'use strict';

var express = require('express');
var controller = require('./websiteUser.controller');
var config = require('../../config/environment');
var auth = require('../../authWebsite/auth.service');

var router = express.Router();

// router.get('/', controller.index);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/updateProfile', auth.isAuthenticated(), controller.updateProfile);
router.patch('/:id/updateProfile', auth.isAuthenticated(), controller.updateProfile);
router.post('/forgotPassword', controller.forgotPassword);
router.post('/resetPassword/:token', controller.resetPassword);
// router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;