'use strict';

var express = require('express');
var controller = require('./coordForm.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/dashForms', auth.isAuthenticated(), controller.showByIdArray);
router.get('/:id', auth.isAuthenticated(), controller.showById);
router.get('/dashFormFields/:category', auth.isAuthenticated(), controller.showByCategory);
router.get('/dashFormValues/:id', auth.isAuthenticated(), controller.showValues);
router.get('/showDepartmentResponses/:id', auth.isAuthenticated(), controller.showValuesAll);

router.post('/', auth.isAuthenticated(), auth.hasRole('admin'), controller.create);
router.post('/saveForm', auth.isAuthenticated(), controller.saveForm);

router.post('/delete', auth.isAuthenticated(), controller.destroy);

router.delete('/:id', auth.isAuthenticated(), auth.hasRole('admin'), controller.destroy);

module.exports = router;