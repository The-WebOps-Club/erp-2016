 'use strict';

var _ = require('lodash');
var Wall = require('../wall/wall.model');
var Department = require('./department.model');
var forEach = require('async-foreach').forEach;

// Get list of departments
exports.index = function(req, res) {
  Department.find(function (err, departments){
    if(err) { return handleError(res, err); }
    return res.json(200, departments);
  })
  .populate('cores coords superCoords qms subDepartments');
};

exports.makeWalls = function (req, res) {
  Department.find({}, function (err, departments) {
    if(err) return res.json(500, err);
    forEach(departments, function(department, index, arr) {
      var done = this.async();
      var newWall = new Wall({ name: department.name, parentId: department._id});
      newWall.save(function (err, wall) {
        if (err) { console.log(err); return validationError(res, err); }
        department.wall = wall._id;
        department.save(function (err, department) {
          if (err) { console.log(err); return validationError(res, err); }
        });
      });
      done();
    }, function allDone (notAborted, arr) {
      res.status(200).json("{message: Successful}");
    });
  })
}
// Get a single department
exports.show = function(req, res) {
  Department.findById(req.params.id, function (err, department) {
    if(err) { return handleError(res, err); }
    if(!department) { return res.send(404); }
    return res.json(department);
  })
  .populate('cores coords superCoords qms subDepartments');
};

// Creates a new department in the DB.
exports.create = function(req, res) {
  var newDepartment = new Department(req.body);
  var newWall = new Wall({ name: req.body.name, parentId: newDepartment._id});
  newWall.save(function (err, wall) {
    if (err) { console.log(err); return validationError(res, err); }
    newDepartment.wall = wall._id;
    newDepartment.save(function(err, department) {
      if(err) { return handleError(res, err); }
      return res.json(201, department);
    });
  });
};

// Updates an existing department in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Department.findById(req.params.id, function (err, department) {
    if (err) { return handleError(res, err); }
    if(!department) { return res.send(404); }
    var updated = _.merge(department, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, department);
    });
  });
};

// Deletes a department from the DB.
exports.destroy = function(req, res) {
  Department.findById(req.params.id, function (err, department) {
    if(err) { return handleError(res, err); }
    if(!department) { return res.send(404); }
    department.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}