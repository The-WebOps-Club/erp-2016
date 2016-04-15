'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var Department = require('../department/department.model');

var validationError = function (res, err) {
  return res.json(422, err);
};

function handleError(res, err) {
  return res.json(500, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function (req, res) {
  User.find({}, '-salt -hashedPassword -lastSeen', function (err, users) {
    if(err) return res.json(500, err);
    res.json(200, users);
  })
  .populate('department', 'name');
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  // console.log(req.body);
  var newUser = new User(req.body);
  newUser.role = 'user';
  newUser.provider = 'local';
  newUser.save(function (err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.sendStatus(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function (req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.json(500, err);
    return res.sendStatus(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function (req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function (err) {
        if (err) return validationError(res, err);
        res.sendStatus(200);
      });
    } else {
      res.sendStatus(403);
    }
  });
};

/**
 * Updates a users profile details
 */
exports.updateProfile = function (req, res, next) {
  var userId = req.user._id;
  var userUpdate = req.body.userUpdate;

  // I'm no where using req.params.id here. Do a better algo
  User.findById(userId, function (err, user) {
    if(err) return validationError(res, err);
    if(!user) return res.sendStatus(404);
    user.name = userUpdate.name;
    user.city = userUpdate.city;
    user.summerLocation = userUpdate.summerLocation;
    user.cgpa = userUpdate.cgpa;
    user.phoneNumber = userUpdate.phoneNumber;
    user.save(function (err) {
      if(err) return validationError(res, err);
      res.sendStatus(200);
    });
  });
};

/**
 * Get my info
 */
exports.me = function (req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function (err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.sendStatus(401);
    res.json(user);
  });
};

/**
 * Add any user to any department as a coord
 * @param {req.body.department} : Department ID
 * @param {req.body.user} : User ID
 * @param {Function} : User and Department IDs are sent 
 *                     in the body of the request.
 *                     Using that we see if user already exists in department
 *                     or if Department already exists in the user
 */
exports.addDepartment = function (req, res, next) {
  User.findById(req.body.user, function (err, user) {
    Department.findById(req.body.department, function (err, department) {
      if(err) { return handleError(res, err); }
      if(!department) { return res.sendStatus(404); }
      if(department[req.body.role].indexOf(user._id) == -1){
        department[req.body.role].push(user._id);
        department.save(function (err) {
          if(err) { return handleError(res, err); }
        });
      }
      if(user.department.indexOf(department._id) == -1){
        user.department.push(req.body.department);
        user.save(function (err) {
          if(err) { return handleError(res, err); }
          res.sendStatus(200); 
        });
      }
      else res.sendStatus(200);
    });
  });
};

/**
 * Add any user to a SubDepartment
 * @param {req.body.subDepartment}   req  SubDepartment ID
 * @param {req.body.user}   req  User ID
 * @param {Function} User and SubDepartment IDs are sent 
 *                   in the body of the request.
 *                   Using that we see if user already exists in subDepartment
 *                   or if SubDepartment already exists in the user
 */
exports.addSubDepartment = function(req, res, next) {
  User.findById(req.body.user, function (err, user) {
    SubDepartment.findById(req.body.subDepartment, function (err, subDepartment) {
      if(err) { return handleError(res, err); }
      if(!subDepartment) { return res.sendStatus(404); }
      if (subDepartment[req.body.role].indexOf(user._id) == -1){
        subDepartment[req.body.role].push(user._id);
        subDepartment.save(function (err) {
          if(err) { return handleError(res, err); }
          if(user.subDepartment(subDepartment._id) == -1){
            user.subDepartment.push(req.body.subDepartment);
            user.save(function (err) {
              if(err) { return handleError(res, err); }
              res.sendStatus(200); 
            });
          }
        });
      }
      else res.sendStatus(200);
    });
  });
};

/**
 * 
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};