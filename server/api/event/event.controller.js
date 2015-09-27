'use strict';

var _ = require('lodash');
var Event = require('./event.model');

// Get list of events
exports.index = function(req, res) {
  Event.find(function (err, events) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(events);
  });
};

// Get a single event
exports.show = function(req, res) {
  Event.findById(req.params.id)
  .populate('createdBy', 'name')
  .populate('lastUpdatedBy', 'name')
  .populate('assignees', 'name phoneNumber')
  .populate('eventCategory', 'title')
  .populate('tdpform', '_id')
  .exec(function (err, event) {
    if(err) { return handleError(res, err); }
    if(!event) { return res.sendStatus(404); }
    return res.json(event);
  });
};

//Get multiple events
exports.getMultiple = function(req, res) {
  Event.find({ 'eventCategory': req.params.id }, function (err, events) {
    if(err) { return handleError(res, err); }
    if(!events) { return res.sendStatus(404); }
    // console.log(events);
    return res.json(events);
  });
};

// Creates a new event in the DB.
exports.create = function(req, res) {
  req.body.createdOn = Date.now();
  req.body.updatedOn = Date.now();
  req.body.createdBy = req.user._id;
  req.body.lastUpdatedBy = req.user._id;
  Event.create(req.body, function (err, event) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(event);
  });
};

// Updates an existing event in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  if(req.user.role != 'core' && req.user.role != 'admin') delete req.body.assignees;
  Event.findById(req.params.id, function (err, event) {
    if (err) { return handleError(res, err); }
    if(!event) { return res.sendStatus(404); }
    req.body.updatedOn = Date.now();
    var updated = _.assign(event, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(event);
    });
  });
};

// Deletes a event from the DB.
exports.destroy = function(req, res) {
  Event.findById(req.params.id, function (err, event) {
    if(err) { return handleError(res, err); }
    if(!event) { return res.sendStatus(404); }
    event.remove(function (err) {
      if(err) { return handleError(res, err); }
      return res.sendStatus(204);
    });
  });
};

function handleError(res, err) {
  return res.status(500).json(err);
}