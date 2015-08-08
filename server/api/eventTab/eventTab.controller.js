'use strict';

var _ = require('lodash');
var EventTab = require('./eventTab.model');

// Get list of eventTabs
exports.index = function(req, res) {
  EventTab.find(function (err, eventTabs) {
    if(err) { return handleError(res, err); }
    return res.json(200, eventTabs);
  });
};

// Get a single eventTab
exports.show = function(req, res) {
  EventTab.find({'eventID': req.params.id}, function (err, eventTab) {
    if(err) { return handleError(res, err); }
    if(!eventTab) { return res.send(404); }
    return res.json(eventTab);
  });
};

// Creates a new eventTab in the DB.
exports.create = function(req, res) {
  EventTab.create(req.body, function(err, eventTab) {
    if(err) { return handleError(res, err); }
    return res.json(201, eventTab);
  });
};

// Updates an existing eventTab in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  EventTab.findById(req.params.id, function (err, eventTab) {
    if (err) { return handleError(res, err); }
    if(!eventTab) { return res.send(404); }
    var updated = _.merge(eventTab, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, eventTab);
    });
  });
};

// Deletes a eventTab from the DB.
exports.destroy = function(req, res) {
  EventTab.findById(req.params.id, function (err, eventTab) {
    if(err) { return handleError(res, err); }
    if(!eventTab) { return res.send(404); }
    eventTab.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}