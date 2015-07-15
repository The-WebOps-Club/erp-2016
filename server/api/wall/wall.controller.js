'use strict';

var _ = require('lodash');
var Wall = require('./wall.model');
var User = require('../user/user.model');
var Department = require('../department/department.model');
var SubDepartment = require('../subDepartment/subDepartment.model');
var Group = require('../group/group.model');


//Find members of the wall

exports.getMembers = function (wallId, callback) {
  var members = []
  Wall.findById(wallId, function (err, wall) {
    if (err) return [];
    if(!wall) return [];
    User.findOne({wall: wallId}, function (err, user) {
      if(user){
        members.push(user);
        callback(members);
      }
    });
    Department.findOne({wall: wallId}, function (err, department) {
      if(department){
        callback(members.concat(department.cores).concat(department.superCoords).concat(department.coords).concat(department.qms));
      }
    })
    .populate('cores coords superCoords qms');
    SubDepartment.findOne({wall: wallId}, function (err, subDepartment) {
      if(subDepartment){
        callback(members.concat(subDepartment.cores).concat(subDepartment.superCoords).concat(subDepartment.coords).concat(subDepartment.qms))      }
    })
    .populate('cores coords superCoords qms');
    Group.findOne({wall: wallId}, function (err, group) {
      if(group){
        callback(members.concat(group.cores).concat(group.superCoords).concat(group.coords).concat(group.qms))      }
    })
    .populate('cores coords superCoords qms');
  });
};

// Get list of walls
exports.index = function(req, res) {
  Wall.find(function (err, walls) {
    if(err) { return handleError(res, err); }
    return res.json(200, walls);
  });
};

// Get a single wall
exports.show = function(req, res) {
  Wall.findById(req.params.id, function (err, wall) {
    if(err) { return handleError(res, err); }
    if(!wall) { return res.send(404); }
    return res.json(wall);
  });
};

// Creates a new wall in the DB.
exports.create = function(req, res) {
  Wall.create(req.body, function(err, wall) {
    if(err) { return handleError(res, err); }
    return res.json(201, wall);
  });
};

// Updates an existing wall in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Wall.findById(req.params.id, function (err, wall) {
    if (err) { return handleError(res, err); }
    if(!wall) { return res.send(404); }
    var updated = _.merge(wall, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, wall);
    });
  });
};

// Deletes a wall from the DB.
exports.destroy = function(req, res) {
  Wall.findById(req.params.id, function (err, wall) {
    if(err) { return handleError(res, err); }
    if(!wall) { return res.send(404); }
    wall.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}