'use strict';

var _ = require('lodash');
var Tdpform = require('./tdpform.model');
var Event = require('../event/event.model');

// Get list of tdpforms
exports.index = function(req, res) {
  Tdpform.find(function (err, tdpforms) {
    if(err) { return handleError(res, err); }
    return res.json(200, tdpforms);
  });
};

// Get a single tdpform for a particular eventID (req.params.id)
exports.show = function(req, res) {
  Tdpform.findOne({event: req.params.id})
  .populate('tdpForm', 'questions')
  .exec(function (err, questions) {
    if(err) { return handleError(res, err); }
    if(!questions) { return res.send(404); }
    return res.json(questions);
  });
};

// Creates a new tdpform in the DB.
exports.create = function(req, res) {
  Event.findById(req.body.event, function(err, event) {
    if(event.core!=req.user._id && event.assignees.indexOf(req.user._id)==-1)
      return res.send(401, "Unauthorised");
    else {
      console.log(req.body.questions);
      req.body.questions=JSON.parse(req.body.questions);
      Tdpform.create(req.body, function(err, tdpform) {
        var updated = _.assign(event, { tdpForm: tdpform._id });
        updated.save(function (err) {
          if (err) { return handleError(res, err); }
          return;
        });
        if(err) { return handleError(res, err); }
        return res.json(201, tdpform);
      });
    }
  });
};

// Updates an existing tdpform in the DB.
exports.update = function(req, res) {
  Event.findById(req.body.event, function(err, event) {
    if(event.core!=req.user._id && event.assignees.indexOf(req.user._id)==-1)
      return res.send(401, "Unauthorised");
    else {
      if(req.body._id) { delete req.body._id; }
      Tdpform.findById(req.params.id, function (err, tdpform) {
        if (err) { return handleError(res, err); }
        if(!tdpform) { return res.send(404); }
        var updated = _.merge(tdpform, req.body);
        updated.save(function (err) {
          if (err) { return handleError(res, err); }
          return res.json(200, tdpform);
        });
      });
    }
  });
};

// Deletes a tdpform from the DB.
exports.destroy = function(req, res) {
  Event.findById(req.body.event, function(err, event) {
    if(event.core!=req.user._id && event.assignees.indexOf(req.user._id)==-1)
      return res.send(401, "Unauthorised");
    else {
      Tdpform.findById(req.params.id, function (err, tdpform) {
        if(err) { return handleError(res, err); }
        if(!tdpform) { return res.send(404); }
        tdpform.remove(function(err) {
          if(err) { return handleError(res, err); }
          return res.send(204);
        });
      });
    }
  });
};

function handleError(res, err) {
  return res.send(500, err);
}