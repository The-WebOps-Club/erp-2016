'use strict';

var _ = require('lodash');
var MarqueeNotif = require('./marqueeNotif.model');
var Event = require('../event/event.model');

// Get list of marqueeNotifs
exports.index = function(req, res) {
  MarqueeNotif.find(function (err, marqueeNotifs) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(marqueeNotifs);
  });
};

// Get a single marqueeNotif
exports.show = function(req, res) {
  MarqueeNotif.findById(req.params.id, function (err, marqueeNotif) {
    if(err) { return handleError(res, err); }
    if(!marqueeNotif) { return res.status(404).send('Not Found'); }
    return res.json(marqueeNotif);
  });
};

// Creates a new marqueeNotif in the DB.
exports.create = function(req, res) {
  Event.findById(req.params.eventId, function (err1, eventFound) {
    if(err1) { return handleError(res, err1); }
    else {
      if(eventFound.assignees.indexOf(req.user._id)>=0 || req.user.role === 'superCoord' || req.user.role === 'core' || req.user.role === 'admin') {
        MarqueeNotif.create(req.body, function (err, marqueeNotif) {
          if(err) { return handleError(res, err); }
          else {
            console.log(eventFound.marqueeNotifs);
            eventFound.marqueeNotifs.push(marqueeNotif._id);
            eventFound.save(function (err2) {
              if(err2) { return handleError(res, err2); }
              else {
                return res.status(201).json(marqueeNotif);
              }
            })
          }
        });
      }
    }
  });
};

// Updates an existing marqueeNotif in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  MarqueeNotif.findById(req.params.id, function (err, marqueeNotif) {
    if (err) { return handleError(res, err); }
    else {
      if(!marqueeNotif) { return res.status(404).send('Not Found'); }
      marqueeNotif.info = req.body.newInfo;
      marqueeNotif.save(function (err) {
        if (err) { return handleError(res, err); }
        else {
          return res.status(200).json(marqueeNotif);
        }
      });
    }
  });
};

// Deletes a marqueeNotif from the DB.
exports.destroy = function(req, res) {
  MarqueeNotif.findById(req.params.id, function (err, marqueeNotif) {
    if(err) { return handleError(res, err); }
    if(!marqueeNotif) { return res.status(404).send('Not Found'); }
    marqueeNotif.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}