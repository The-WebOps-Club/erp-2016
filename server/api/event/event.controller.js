'use strict';

var _ = require('lodash');
var EventList = require('../eventList/eventList.model');
var Event = require('./event.model');

// Get list of events
exports.index = function(req, res) {
  var currDate = Date.now();
  Event.find({'startReg': {$lte: currDate}, 'endReg': {$gte: currDate}})
  .sort({'name':1})
  .exec(function (err, events) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(events);
  });
};

exports.forSearch = function(req, res) {
  Event.find({'acceptedByAdmin': true}, 'name _id eventCategory imagename imageid info venue')
  .exec(function (err, events) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(events);
  });
};

exports.forOnSpotConfirmations = function (req, res) {
  Event.find({'acceptedByAdmin': true}, 'name _id eventCategory maxTeamMembers minTeamMembers eventCategory')
  .exec(function (err, events) {
    if(err) { return handleError(res, err); }
    var finalRes = { 'data': events };
    return res.status(200).json(finalRes);
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
  .populate('marqueeNotifs')
  .exec(function (err, event) {
    if(err) { return handleError(res, err); }
    if(!event) { return res.sendStatus(404); }
    return res.json(event);
  });
};

// Get a single event
exports.showWeb = function(req, res) {
  Event.findById(req.params.id)
  .populate('eventTabs')
  .populate('assignees', 'name phoneNumber')
  .populate('marqueeNotifs')
  .sort({'name':1})
  .exec(function (err, event) {
    if(err) { return handleError(res, err); }
    if(!event) { return res.sendStatus(404); }
    return res.json(event);
  });
};

// Get multiple events
exports.getMultiple = function(req, res) {
  Event.find({ 'eventCategory': req.params.id }, null, {sort: {'name':1}}, function (err, events) {
    if(err) { return handleError(res, err); }
    if(!events) { return res.sendStatus(404); }
    // console.log(events);
    return res.json(events);
  });
};

exports.forStats = function(req, res) {
  Event.find({}, null, {sort: {'name':1}}, function (err, events) {
    if(err) { return handleError(res, err); }
    if(!events) { return res.sendStatus(404); }
    // console.log(events);
    return res.json(events);
  })
  .populate('registrations')
  .populate('eventCategory');
};

// Get events assigned
exports.myEvents = function(req, res) {
  Event.find({ assignees: { "$in" : [req.user._id] } })
  .populate('assignees', '-salt -hashedPassword -lastSeen -provider')
  .populate('createdBy', '-salt -hashedPassword -lastSeen -provider')
  .populate('lastUpdatedBy', '-salt -hashedPassword -lastSeen -provider')
  .populate('marqueeNotifs')
  .sort({'name':1})
  .exec(function (err, events) {
    if(err) { return handleError(res, err); }
    if(!events) { return res.sendStatus(404); }
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
    if(!err) {
      EventList.findById(event.eventCategory, function (err2, eventList) {
        if(!err2) { 
          eventList.events.push(event._id);
          eventList.save(function (err3) {
            return res.status(201).json(event);
          });
        }
      });
    }
  });
};

// Updates an existing event in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  if(req.user.role != 'superCoord' && req.user.role != 'core' && req.user.role != 'admin') delete req.body.assignees;
  Event.findById(req.params.id, function (err, event) {
    if (err) { return handleError(res, err); }
    if(!event) { return res.sendStatus(404); }
    else {
      if(event.assignees.indexOf(req.user._id)>=0 || req.user.role === 'superCoord' || req.user.role === 'core' || req.user.role === 'admin') {
        req.body.updatedOn = Date.now();
        var updated = _.assign(event, req.body);
        updated.save(function (err) {
          if (err) { return handleError(res, err); }
          return res.status(200).json(event);
        });
      } else {
        return res.sendStatus(401);
      }
    }
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