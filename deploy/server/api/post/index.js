'use strict';

var express = require('express');
var controller = require('./post.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/newsfeed/:page', auth.isAuthenticated(), controller.newsfeed);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/:id/:page', auth.isAuthenticated(), controller.index);

router.post('/', auth.isAuthenticated(), controller.createPost);
router.post('/newsfeed/refresh/', auth.isAuthenticated(), controller.newsfeedRefresh);
router.post('/newsfeed/history/', auth.isAuthenticated(), controller.newsfeedHistory);
router.post('/:id/refresh/', auth.isAuthenticated(), controller.refresh);
router.post('/:id/history/', auth.isAuthenticated(), controller.history);
router.post('/addComment', auth.isAuthenticated(), controller.addComment);
router.post('/:id', auth.isAuthenticated(), controller.acknowledge);

router.put('/:id', auth.isAuthenticated(), controller.update);

router.patch('/:id', auth.isAuthenticated(), controller.update);

router.delete('/:id', auth.hasRole("admin"), controller.destroy);

module.exports = router;
