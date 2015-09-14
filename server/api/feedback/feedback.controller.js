'use strict';

var _ = require('lodash');
var Feedback = require('./feedback.model');

// Get list of feedbacks
exports.index = function(req, res) {
  Feedback.find(function (err, feedbacks) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(feedbacks);
  });
};

// Get a single feedback
exports.show = function(req, res) {
  Feedback.findById(req.params.id, function (err, feedback) {
    if(err) { return handleError(res, err); }
    if(!feedback) { return res.status(404).send('Not Found'); }
    return res.json(feedback);
  });
};

// Creates a new feedback in the DB.
exports.create = function(req, res) {
  req.body.coordId = req.user.id;
  Feedback.create(req.body, function(err, feedback) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(feedback);
  });
};

// Updates an existing feedback in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Feedback.findById(req.params.id, function (err, feedback) {
    if (err) { return handleError(res, err); }
    if(!feedback) { return res.status(404).send('Not Found'); }
    var updated = _.merge(feedback, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(feedback);
    });
  });
};

// Deletes a feedback from the DB.
exports.destroy = function(req, res) {
  Feedback.findById(req.params.id, function (err, feedback) {
    if(err) { return handleError(res, err); }
    if(!feedback) { return res.status(404).send('Not Found'); }
    feedback.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}