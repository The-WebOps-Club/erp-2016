'use strict';

var _ = require('lodash');
var Hostel = require('./hostel.model');

// Get list of hostels
exports.index = function(req, res) {
  Hostel.find(function (err, hostels) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(hostels);
  });
};

// Get a single hostel
exports.show = function(req, res) {
  Hostel.findById(req.params.id, function (err, hostel) {
    if(err) { return handleError(res, err); }
    if(!hostel) { return res.status(404).send('Not Found'); }
    return res.json(hostel);
  });
};

// Creates a new hostel in the DB.
exports.create = function(req, res) {
  Hostel.create(req.body, function(err, hostel) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(hostel);
  });
};

// Updates an existing hostel in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Hostel.findById(req.params.id, function (err, hostel) {
    if (err) { return handleError(res, err); }
    if(!hostel) { return res.status(404).send('Not Found'); }
    var updated = _.merge(hostel, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(hostel);
    });
  });
};

// Deletes a hostel from the DB.
exports.destroy = function(req, res) {
  Hostel.findById(req.params.id, function (err, hostel) {
    if(err) { return handleError(res, err); }
    if(!hostel) { return res.status(404).send('Not Found'); }
    hostel.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}