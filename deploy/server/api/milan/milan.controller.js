'use strict';

var _ = require('lodash');
var Milan = require('./milan.model');

// Get list of milans
exports.index = function(req, res) {
  Milan.find(function (err, milans) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(milans);
  });
};

// Get a single milan
exports.show = function(req, res) {
  Milan.findById(req.params.id, function (err, milan) {
    if(err) { return handleError(res, err); }
    if(!milan) { return res.status(404).send('Not Found'); }
    return res.json(milan);
  });
};

// Creates a new milan in the DB.
exports.create = function(req, res) {
  Milan.create(req.body, function(err, milan) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(milan);
  });
};

// Updates an existing milan in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Milan.findById(req.params.id, function (err, milan) {
    if (err) { return handleError(res, err); }
    if(!milan) { return res.status(404).send('Not Found'); }
    var updated = _.merge(milan, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(milan);
    });
  });
};

// Deletes a milan from the DB.
exports.destroy = function(req, res) {
  Milan.findById(req.params.id, function (err, milan) {
    if(err) { return handleError(res, err); }
    if(!milan) { return res.status(404).send('Not Found'); }
    milan.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}