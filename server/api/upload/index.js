'use strict';

var express = require('express');
var controller = require('./upload.controller');

var router = express.Router();


router.get('/', controller.serve);
//router.get('/getSubDepartment', controller.getSubDepartments);
//router.get('/getType', controller.getTypes);
router.get('/:departmentName', controller.getFiles)
router.get('/:departmentName/:fileName', controller.download);
router.post('/', controller.uploadFunction);
//router.post('/:fullName', controller.uploadFunction);
router.delete('/:id', controller.destroy);

module.exports = router;