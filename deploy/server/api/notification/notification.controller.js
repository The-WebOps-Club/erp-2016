'use strict';

var _ = require('lodash');
var Notification = require('./notification.model');
var User = require('../user/user.model');
var notifier = require('../../components/gcm')
var gcm = require('node-gcm');

var sendNotif = function (text, regIds) {
  var message = new gcm.Message();
  message.addData('message',text);
  console.log(message);
  // var regIds = ['fV2UjeX-Hss:APA91bFadbsF_OfuoOgDEjMwAytPocrp9zoeYp8aFsUrMCp7Orl-gYwEkdeRmSkx6-uucnWROifcij9aUERvLTL4T840zAbDjymToLeCS6Ws5yytDeMpnVSyMgVwiCkU-99xF6Wvrjs2'];
  if(!(regIds instanceof Array))
    regIds=[regIds]
  var sender = new gcm.Sender('AIzaSyDSLwzK4C2Dqth55Z3SgXU77D7Xsex4VbI');

  sender.send(message, regIds, function (err, result) {
    if(err) console.error(err);
    else    console.log(result);
  });
};

// Get list of notifications
exports.index = function(req, res) {
  Notification.find(function (err, notifications) {
    if(err) { return handleError(res, err); }
    return res.json(200, notifications);
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
  Notification.create(req.body, function (err, notification) {
    if(err) { return handleError(res, err); }
    Notification.findById(notification._id)
    .deepPopulate('user.deviceId post.wall postedBy.name commentedBy.name')
    .exec( function (err, notification) {
      if(notification.user.deviceId){
        if(notification.action=='post'){
          var message=notification.postedBy.name +" posted on "+notification.post.wall.name;
          console.log("Sending notification : "+message + " , id : " + notification.user.deviceId);
          sendNotif(message, notification.user.deviceId);
        } else {
          var message=notification.commentedBy.name +" comment on a post by "+
          notification.postedBy.name+ " on the " + notification.post.wall.name+" wall";
          console.log("Sending notification : "+message + " , id : " + notification.user.deviceId);
          sendNotif(message, notification.user.deviceId);
        }
      }
      return res.json(201, notification);
    });
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