'use strict';

var express = require('express');
var controller = require('./post.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);

router.post('/createPost', auth.isAuthenticated(), controller.createPost);
router.post('/addComment', auth.isAuthenticated(), controller.addComment);

router.put('/:id', controller.update);

router.patch('/:id', controller.update);

router.delete('/:id', controller.destroy);

module.exports = router;