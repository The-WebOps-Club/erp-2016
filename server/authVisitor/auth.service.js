'use strict';

var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var Visitor = require('../api/visitor/visitor.model');
var validateJwt = expressJwt({ secret: config.secrets.session });

/**
 * Attaches the visitor object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if(req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach visitor to request
    .use(function(req, res, next) {
      Visitor.findById(req.visitor._id, function (err, visitor) {
        if (err) return next(err);
        if (!visitor) return res.send(401);
        visitor.save(function(err) {
          if(err) return next(err);
        });
        req.visitor = visitor;
        next();
      });
    });
}

/**
 * Checks if the visitor role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
  if (!roleRequired) throw new Error('Required role needs to be set');

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      next();
    });
}

function belongsTo() {

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      next();
    });

}
/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id) {
  return jwt.sign({ _id: id }, config.secrets.session, { expiresInMinutes: 60*24*2 });
}

function signMobileToken(id) {
  return jwt.sign({ _id: id }, config.secrets.session, { expiresInMinutes: 60*24*365 });
}

/**
 * Set token cookie directly for oAuth strategiesntity
 */
function setTokenCookie(req, res) {
  /* passportJS puts the authorised object, i.e visitor object in this case as req.user */
  if (!req.user) return res.json(404, { message: 'Something went wrong, please try again.'});
  var token = signToken(req.user._id, 'visitor');
  res.cookie('token', JSON.stringify(token));
  res.redirect('/');
}

exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.signMobileToken = signMobileToken;
exports.setTokenCookie = setTokenCookie;
exports.belongsTo = belongsTo;