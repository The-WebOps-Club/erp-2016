'use strict';

var _ = require('lodash');
var Notification = require('./notification.model');
var gcm = require('node-gcm');

// Get list of notifications
exports.index = function(req, res) {
  Notification.find(function (err, notifications) {
    if(err) { return handleError(res, err); }
    return res.json(200, notifications);
  });
};

exports.sendNotif = function(req, res) {
  var message = new gcm.Message();

  message.addData('message', 'This is a test');

  var regIds = [''];
  var sender = new gcm.Sender('-----BEGIN PRIVATE KEY-----\nMIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBANlVwKNUxx6sct3e\nhtPfNZUvRLbyOy5LeiML+SyMoDGa/ro9KU/5J7ZAVaA6FQhDEc6RL/bjWxrq8Tfc\niYr4vwtuZJ5htsS77xKA0RGBaSMX+TpYZoqeU/4HuWrSgUfwv1ZVC58vCcaq6gKY\noA/aYYGgHow+mBM2B3Qu4l2yCLgvAgMBAAECgYAf5TfaQIzgcYqCCTBcU7u3YzKA\nbthEmQsZrZ4p7ZFs9kQ/7M3tULGFS7fFRgDkL4Ojfyc84mzybFxuSE1fOdY/f9wu\nV/tYCzT6+42rX8CQOXQ3h9PKSHr9o1NcO1zq04245QInmKZIh53b+TwOniUVlKre\n+F3xraN7IAFZsQ6zUQJBAPrs5urhIxdoiPa+oZCbaNWyb8NlJknH3gm7w/T0NN3J\n4cgdj1TkGAguw4w7jf/XSFdsC1z2/G31qdnUPxT4KvMCQQDduvH2qBAWawKvQ9Az\nxeciYL47DxHq5e1AjzQ8Ao5MEFOGuhcEavX4o9Wd7qbzujHI3x9uWraL4n+ox2Fb\nhhTVAkEAy4KSMpOQY27cDstDvEXfO9pxvNbvu81HbzuDTcs2iV8wKJ6Y3i/0scZD\nwRuYKpTPTmAJw0dqKkChllMHKpmwMwJAba+hKseQzcY6GcGOKU5pPJRnBog58N21\nNA6jZFxPUElzSF6eLE1NSKajcfExHbiqEBhwUAMH8sMlK7UV8FSv0QJAdaSLm/Ow\noZkAUaV/BM4P7JgR8UdDBMesMJT+JbF3s3B4nHYFq1U2AtS+4S3JeEdbH7cCCF8v\nEgJUX0QmL1Yyjw\u003d\u003d\n-----END PRIVATE KEY-----\n');

  sender.send(message, regIds, function (err, result) {
    if(err) console.error(err);
    else    console.log(result);
  });
};

// Get a single notification
exports.show = function(req, res) {
  Notification.findById(req.params.id, function (err, notification) {
    if(err) { return handleError(res, err); }
    if(!notification) { return res.send(404); }
    return res.json(notification);
  });
};

// Creates a new notification in the DB.
exports.create = function(req, res) {
  Notification.create(req.body, function(err, notification) {
    if(err) { return handleError(res, err); }
    return res.json(201, notification);
  });
};

// Updates an existing notification in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Notification.findById(req.params.id, function (err, notification) {
    if (err) { return handleError(res, err); }
    if(!notification) { return res.send(404); }
    var updated = _.merge(notification, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, notification);
    });
  });
};

// Deletes a notification from the DB.
exports.destroy = function(req, res) {
  Notification.findById(req.params.id, function (err, notification) {
    if(err) { return handleError(res, err); }
    if(!notification) { return res.send(404); }
    notification.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}