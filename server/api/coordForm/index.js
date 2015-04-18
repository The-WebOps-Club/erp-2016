'use strict';

var express = require('express');
var controller = require('./coordForm.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/myForms', auth.isAuthenticated(), controller.showByUser);
router.get('/:id', auth.isAuthenticated(), controller.showById);
router.get('/department/:department', auth.isAuthenticated(), controller.showByDepartment);
router.get('/getForm/:id', auth.isAuthenticated(), controller.getForm);
router.get('/getResponse/:id', auth.isAuthenticated(), controller.getResponse);
router.get('/showResponse/:id', auth.hasRole('core'), controller.showResponse);
router.get('/showResponses/:id', auth.hasRole('core'), controller.showAllResponses);


router.post('/', auth.isAuthenticated(), auth.hasRole('admin'), controller.create);
router.post('/saveForm', auth.isAuthenticated(), controller.saveForm);

router.post('/delete', auth.isAuthenticated(), controller.destroy);
router.post('/deleteApp', auth.isAuthenticated(), controller.deleteApp);

router.put('/response/:id', auth.hasRole('core'), controller.updateResponse)

router.delete('/:id', auth.isAuthenticated(), auth.hasRole('admin'), controller.destroy);

module.exports = router;