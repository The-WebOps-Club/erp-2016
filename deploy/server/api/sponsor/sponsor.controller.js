'use strict';

var _ = require('lodash');
var Sponsor = require('./sponsor.model');

// Get list of sponsors
exports.index = function(req, res) {
  Sponsor.find(function (err, sponsors) {
    if(err) { return handleError(res, err); }
    return res.json(200, sponsors);
  });
};

// Get a single sponsor
exports.show = function(req, res) {
  Sponsor.findById(req.params.id, function (err, sponsor) {
    if(err) { return handleError(res, err); }
    if(!sponsor) { return res.send(404); }
    return res.json(sponsor);
  });
};

// Creates a new sponsor in the DB.
exports.create = function(req, res) {
  Sponsor.create(req.body, function(err, sponsor) {
    if(err) { return handleError(res, err); }
    return res.json(201, sponsor);
  });
};

// Updates an existing sponsor in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Sponsor.findById(req.params.id, function (err, sponsor) {
    if (err) { return handleError(res, err); }
    if(!sponsor) { return res.send(404); }
    var updated = _.merge(sponsor, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, sponsor);
    });
  });
};

// Deletes a sponsor from the DB.
exports.destroy = function(req, res) {
  Sponsor.findById(req.params.id, function (err, sponsor) {
    if(err) { return handleError(res, err); }
    if(!sponsor) { return res.send(404); }
    sponsor.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}