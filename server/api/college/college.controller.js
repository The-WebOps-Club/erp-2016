'use strict';

var _ = require('lodash');
var College = require('./college.model');

// Get list of colleges
exports.index = function(req, res) {
  College.find({})
  .sort('collegeName')
  .exec(function (err, colleges) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(colleges);
  });
};

// Get a single college
exports.show = function(req, res) {
  College.findById(req.params.id, function (err, college) {
    if(err) { return handleError(res, err); }
    if(!college) { return res.status(404).send('Not Found'); }
    return res.json(college);
  });
};

// Creates a new college in the DB.
exports.create = function(req, res) {
  College.create(req.body, function (err, college) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(college);
  });
};

// Updates an existing college in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  College.findById(req.params.id, function (err, college) {
    if (err) { return handleError(res, err); }
    if(!college) { return res.status(404).send('Not Found'); }
    var updated = _.merge(college, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(college);
    });
  });
};

// Deletes a college from the DB.
exports.destroy = function(req, res) {
  College.findById(req.params.id, function (err, college) {
    if(err) { return handleError(res, err); }
    if(!college) { return res.status(404).send('Not Found'); }
    college.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}