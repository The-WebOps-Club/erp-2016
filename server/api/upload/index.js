'use strict';

var express = require('express');
var controller = require('./upload.controller');

var router = express.Router();
var multer  = require('multer')
var storage = require('../../components/imageStorage').storage;
var upload = multer({ storage: storage, limits: {fileSize: 1000000}});


router.get('/', controller.serve);
//router.get('/getSubDepartment', controller.getSubDepartments);
//router.get('/getType', controller.getTypes);
router.get('/:departmentName', controller.getFiles)
router.get('/:departmentName/:fileName', controller.download);
router.post('/', upload.single('file'), controller.uploadFunction);
//router.post('/:fullName', controller.uploadFunction);
router.delete('/:id', controller.destroy);

module.exports = router;