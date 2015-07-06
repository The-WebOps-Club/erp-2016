'use strict';

var _ = require('lodash');
var forEach = require('async-foreach').forEach;
var Notification = require('./notification.model');
var User = require('../user/user.model');
var Post = require('../post/post.model');
var notifier = require('../../components/gcm')
var gcm = require('node-gcm');
var getMembers = require('../wall/wall.controller').getMembers;

// var sendNotif = function (text, regIds) {
//   var message = new gcm.Message();
//   message.addData('message',text);
//   // var regIds = ['fV2UjeX-Hss:APA91bFadbsF_OfuoOgDEjMwAytPocrp9zoeYp8aFsUrMCp7Orl-gYwEkdeRmSkx6-uucnWROifcij9aUERvLTL4T840zAbDjymToLeCS6Ws5yytDeMpnVSyMgVwiCkU-99xF6Wvrjs2'];
//   if(!(regIds instanceof Array))
//     regIds=[regIds]
//   var sender = new gcm.Sender('AIzaSyDSLwzK4C2Dqth55Z3SgXU77D7Xsex4VbI');

//   sender.send(message, regIds, function (err, result) {
//     if(err) console.error(err);
//   });
// };

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
          notifier.sendNotif(message, notification.user.deviceId);
        } else {
          var message=notification.commentedBy.name +" comment on a post by "+
          notification.postedBy.name+ " on the " + notification.post.wall.name+" wall";
          console.log("Sending notification : "+message + " , id : " + notification.user.deviceId);
          notifier.sendNotif(message, notification.user.deviceId);
        }
      }
      return res.json(201, notification);
    });
  });
};

exports.notifyAll = function (postId, callback) {
  Post.findById(postId)
  .exec(function (err, post) {
    post.deepPopulate('comments.createdBy', function (err, post) {
      if(post.comments.length === 0) var action = 'post';
      else var action = 'comment';
      getMembers(post.wall, function (members) {
        exports.bulkCreate({post: post, members: members, action: action}, function () {
          callback();
        });
      });
    });
  });
};

exports.bulkCreate = function(data, callback) {
  var deviceIds = [];
  forEach(data.members, function(member, index, arr) {
    var done = this.async();
    Notification.create({post: data.post._id, user: member._id, action: data.action, postedBy: data.post.createdBy._id} , function (err, notification) {
      if(err) { return handleError(res, err); }
      Notification.findById(notification._id)
      .deepPopulate('user.deviceId post.wall postedBy.name commentedBy.name')
      .exec( function (err, notification) {
        if(notification.user.deviceId){
          if(!data.post.createdBy._id === member._id){
            deviceIds = deviceIds.concat(notification.user.deviceId);
          }
        }
        done();
      });
    });
  }, function allDone (notAborted, arr) {
    if(data.post.comments.length === 0){
      var message=data.post.createdBy.name +" posted on "+data.post.wall.name;
      notifier.sendNotif(message, deviceIds);
    } else {
      var message=data.post.postedBy.name +" comment on a post by "+
      data.post.postedBy.name+ " on the " + data.post.wall.name+" wall";
      notifier.sendNotif(message, deviceIds);
    }
    callback();
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