'use strict';

var _ = require('lodash');
var Checkin = require('./checkin.model');

// Get list of checkins
exports.index = function(req, res) {
  Checkin.find(function (err, checkins) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(checkins);
  });
};

// Get a single checkin
exports.show = function(req, res) {
  Checkin.findById(req.params.id, function (err, checkin) {
    if(err) { return handleError(res, err); }
    if(!checkin) { return res.status(404).send('Not Found'); }
    return res.json(checkin);
  });
};

// Creates a new checkin in the DB.
exports.create = function(req, res) {
  Checkin.create(req.body, function(err, checkin) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(checkin);
  });
};

// Updates an existing checkin in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Checkin.findById(req.params.id, function (err, checkin) {
    if (err) { return handleError(res, err); }
    if(!checkin) { return res.status(404).send('Not Found'); }
    var updated = _.merge(checkin, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(checkin);
    });
  });
};

// Deletes a checkin from the DB.
exports.destroy = function(req, res) {
  Checkin.findById(req.params.id, function (err, checkin) {
    if(err) { return handleError(res, err); }
    if(!checkin) { return res.status(404).send('Not Found'); }
    checkin.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}