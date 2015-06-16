'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router.post('/', function(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error) return res.json(401, error);
    if (!user) return res.json(404, {message: 'Something went wrong, please try again.'});

    var token = auth.signToken(user._id, user.role);
    res.json({token: token});
  })(req, res, next)
});

router.post('/mobile', function(req, res, next) {
	passport.authenticate('local', function (err, user, info) {
		var error = err || info;
		if (error) return res.json(401, error);
		if (!user) return res.json(404, {message: 'Something went wrong, please try again.'});
		if (!req.body.deviceId) return res.status(401).json({message: 'Device ID cannot be empty'})
		console.log(req.body.deviceId);
		user.deviceId.push(req.body.deviceId); //Saving device ID to user
		user.save(function (err) {
	        if (err) return res.status(401).json(error);
      	});
		var token = auth.signMobileToken(user._id, user.role);
		var sentUser = JSON.parse(JSON.stringify(user));
		sentUser.hashedPassword = undefined;
		sentUser.salt = undefined;
		sentUser.provider = undefined;
		res.json({
			token: token,
			user: sentUser
		});
	})(req, res, next)
});

module.exports = router;