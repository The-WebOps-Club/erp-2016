'use strict';

var _ = require('lodash');
var Group = require('./group.model');
var Wall = require('../wall/wall.model');
var forEach = require('async-foreach').forEach;

// Get list of groups
exports.index = function(req, res) {
  Group.find(function (err, groups) {
    if(err) { return handleError(res, err); }
    return res.json(200, groups);
  })
  .populate('cores coords superCoords qms');
};

// Get a single group
exports.show = function(req, res) {
  Group.findById(req.params.id, function (err, group) {
    if(err) { return handleError(res, err); }
    if(!group) { return res.send(404); }
    return res.json(group);
  })
  .populate('cores coords superCoords qms');
};

exports.makeWalls = function (req, res) {
  Group.find({}, function (err, groups) {
    if(err) return res.json(500, err);
    forEach(groups, function(group, index, arr) {
      var done = this.async();
      var newWall = new Wall({ name: group.name, parentId: group._id});
      newWall.save(function (err, wall) {
        if (err) { console.log(err); return validationError(res, err); }
        group.wall = wall._id;
        group.save(function (err, user) {
          if (err) { console.log(err); return validationError(res, err); }
        });
      });
      done();
    }, function allDone (notAborted, arr) {
      res.status(200).json("{message: Successful}");
    });
  })
}
// Creates a new group in the DB.
exports.create = function(req, res) {
  var newGroup = new Group(req.body);
  var newWall = new Wall({ name: req.body.name, parentId: newGroup._id});
  newWall.save(function (err, wall) {
    if (err) { console.log(err); return validationError(res, err); }
    newGroup.wall = wall._id;
    newGroup.save(function(err, group) {
      if(err) { return handleError(res, err); }
      return res.json(201, group);
    });
  });
};

// Updates an existing group in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Group.findById(req.params.id, function (err, group) {
    if (err) { return handleError(res, err); }
    if(!group) { return res.send(404); }
    var updated = _.merge(group, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, group);
    });
  });
};

// Deletes a group from the DB.
exports.destroy = function(req, res) {
  Group.findById(req.params.id, function (err, group) {
    if(err) { return handleError(res, err); }
    if(!group) { return res.send(404); }
    group.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}