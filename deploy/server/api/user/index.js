'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/:id/profilePic', controller.profilePic);

router.post('/refresh', auth.isAuthenticated(), controller.refresh);
router.post('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.post('/:id/updateProfile', auth.isAuthenticated(), controller.updateProfile);
router.post('/addDepartment', auth.hasRole('core'), controller.addDepartment);
router.post('/addSubDepartment', auth.hasRole('core'), controller.addSubDepartment);
router.post('/addGroup', auth.hasRole('core'), controller.addGroup);
router.post('/gcmRegister', auth.isAuthenticated(), controller.gcmRegister);
router.post('/forgotPassword', controller.forgotPassword);
router.post('/resetPassword/:token', controller.resetPassword);
router.post('/', controller.create);

router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
