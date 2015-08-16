'use strict';

var express = require('express');
var controller = require('./drive.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/uploadFile/:folderId', controller.createFileInFolder);
router.post('/createFolder',controller.createFolder);
router.get('/listAll',controller.listAll);
router.get('/listFolder/:folderId',controller.listFolder);
router.post('/uploadFile',controller.createFile);
router.post('/createFolder/:parentId',controller.createFolderInFolder);
router.get('/getFile/:fileId',controller.downloadFile);
router.get('/listRootFolder',controller.listRootFolder);
//router.put('/:id', controller.update);
//router.patch('/:id', controller.update);
//router.delete('/:id', controller.destroy);

module.exports = router;