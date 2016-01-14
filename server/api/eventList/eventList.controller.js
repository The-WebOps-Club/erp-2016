'use strict';

var _ = require('lodash');
var EventList = require('./eventList.model');

// Get list of eventLists
exports.index = function(req, res) {
  EventList.find({}, null, {sort: {'title':1}}, function (err, eventLists) {
    if(err) { return handleError(res, err); }
    return res.json(200, eventLists);
  });
};

// Get list of eventLists
exports.indexEvents = function(req, res) {
  EventList.find({}, null, {sort: {'title':1}}, function (err, eventLists) {
    if(err) { return handleError(res, err); }
    return res.json(200, eventLists);
  });
};

// Get list of eventLists
exports.indexWorkshops = function(req, res) {
  EventList.find({}, null, {sort: {'title':1}}, function (err, eventLists) {
    if(err) { return handleError(res, err); }
    return res.json(200, eventLists);
  });
};

// Get a single eventList
exports.show = function(req, res) {
  EventList.findById(req.params.id)
  .sort({'title':1})
  .exec(function (err, eventList) {
    if(err) { return handleError(res, err); }
    if(!eventList) { return res.sendStatus(404); }
    return res.json(eventList);
  });
};

// Get a single eventList
exports.showEvents = function(req, res) {
  EventList.findById(req.params.id)
  .populate({
    path: 'events',
    match: { isEvent: true }
  })
  .sort({'title':1})
  .exec(function (err, eventList) {
    if(err) { return handleError(res, err); }
    if(!eventList) { return res.sendStatus(404); }
    return res.json(eventList);
  });
};

// Get a single eventList
exports.showWorkshops = function(req, res) {
  EventList.findById(req.params.id)
  .populate({
    path: 'events',
    match: { isWorkshop: true }
  })
  .sort({'title':1})
  .exec(function (err, eventList) {
    if(err) { return handleError(res, err); }
    if(!eventList) { return res.sendStatus(404); }
    return res.json(eventList);
  });
};

// Creates a new eventList in the DB.
exports.create = function(req, res) {
  req.body.createdOn = Date.now();
  req.body.updatedOn = Date.now();
  req.body.createdBy = req.user._id;
  req.body.lastUpdatedBy = req.user._id;
  EventList.create(req.body, function (err, eventList) {
    if(err) { return handleError(res, err); }
    return res.json(201, eventList);
  });
};

// Updates an existing eventList in the DB.
exports.update = function(req, res) {
  if(req.body._id) delete req.body._id;
  req.body.updatedOn = Date.now();
  req.body.lastEditedBy = req.user._id;
  if(req.body._id) { delete req.body._id; }
  EventList.findById(req.params.id, function (err, eventList) {
    if (err) { return handleError(res, err); }
    if(!eventList) { return res.send(404); }
    var updated = _.merge(eventList, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, eventList);
    });
  });
};

// Deletes a eventList from the DB.
exports.destroy = function(req, res) {
  EventList.findById(req.params.id, function (err, eventList) {
    if(err) { return handleError(res, err); }
    if(!eventList) { return res.send(404); }
    eventList.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}