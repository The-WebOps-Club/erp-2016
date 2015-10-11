'use strict';

var _ = require('lodash');
var Visitor = require('./visitor.model');

// Get list of visitors
exports.index = function(req, res) {
  Visitor.find(function (err, visitors) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(visitors);
  });
};

// Get a single visitor
exports.show = function(req, res) {
  Visitor.findById(req.params.id, function (err, visitor) {
    if(err) { return handleError(res, err); }
    if(!visitor) { return res.status(404).send('Not Found'); }
    return res.json(visitor);
  });
};

// Creates a new visitor in the DB.
exports.create = function(req, res) {
  Visitor.create(req.body, function(err, visitor) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(visitor);
  });
};

// Updates an existing visitor in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Visitor.findById(req.params.id, function (err, visitor) {
    if (err) { return handleError(res, err); }
    if(!visitor) { return res.status(404).send('Not Found'); }
    var updated = _.merge(visitor, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(visitor);
    });
  });
};

// Deletes a visitor from the DB.
exports.destroy = function(req, res) {
  Visitor.findById(req.params.id, function (err, visitor) {
    if(err) { return handleError(res, err); }
    if(!visitor) { return res.status(404).send('Not Found'); }
    visitor.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}