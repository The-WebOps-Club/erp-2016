'use strict';

var _ = require('lodash');
var Event = require('./event.model');
var User = require('../user/user.model');
var EventList = require('../eventList/eventList.model');

// Get list of events
exports.index = function(req, res) {
  Event.find(function (err, events) {
    if(err) { return handleError(res, err); }
    return res.json(200, events);
  });
};

// Get a single event
exports.show = function(req, res) {
  Event.findById(req.params.id)
  .populate('createdBy','name').populate('lastUpdatedBy','name')
  .populate('assignees','name phoneNumber')
  .populate('eventCategory','title')
  .exec(function (err, event) {
    if(err) { return handleError(res, err); }
    if(!event) { return res.send(404); }
    return res.json(event);
  });
};

//Get multiple events
exports.getMultiple = function(req, res) {
  Event.find({ 'eventCategory': req.params.id }, function (err, events) {
    if(err) { return handleError(res, err); }
    if(!events) { return res.send(404); }
    console.log(events);
    return res.json(events);
  });
};

// Creates a new event in the DB.
exports.create = function(req, res) {
  req.body.createdOn = Date.now();
  req.body.updatedOn = Date.now();
  req.body.createdBy = req.user._id;
  req.body.lastUpdatedBy = req.user._id;
  Event.create(req.body, function(err, event) {
    if(err) { return handleError(res, err); }
    return res.json(201, event);
  });
};

// Updates an existing event in the DB.
exports.update = function(req, res) {
  
  //console.log(req.body);
  // if(req.body.event._id) { delete req.body.event._id; }
  Event.findById(req.body.event._id, function (err, event) {
    if (err) { return handleError(res, err); }
    if(!event) { return res.send(404); }
    req.body.updatedOn = Date.now();
    var updated = _.assign(event, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      if(!req.body.assignees && !req.body.eventCategory){
        return res.json(200, event);
      }
    });
    
    //For findig id of Assignee and saving
    if(req.body.assignees) {
      User.findOne({'name': req.body.assignees}, '_id', function (err, user) {
        if(err) console.log(err);
        if(user != null){
            if(updated.assignees.indexOf(user._id) == -1)
              updated.assignees.push(user._id);
            console.log(updated);
            updated.save(function (err) {
              if (err) { return handleError(res, err); }
              return res.json(200, event);
            });
        }
      });
    }

    //For finding id of eventList and saving
    if(req.body.eventCategory) {
      EventList.findOne({'title': req.body.eventCategory}, '_id',function (err, eventList) {
        if(err) { console.log(err); }
        if(eventList != null){
            if(updated.eventCategory.indexOf(eventList._id) == -1)
              updated.eventCategory.push(eventList._id);
            console.log(updated);
            updated.save(function (err) {
              if (err) { return handleError(res, err); }
              return res.json(200, event);
            });
        }
      });
    }

  });
};

// Deletes a event from the DB.
exports.destroy = function(req, res) {
  Event.findById(req.params.id, function (err, event) {
    if(err) { return handleError(res, err); }
    if(!event) { return res.send(404); }
    event.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}