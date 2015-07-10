'use strict';

var _ = require('lodash');
var forEach = require('async-foreach').forEach;
var Notification = require('./notification.model');
var User = require('../user/user.model');
var Post = require('../post/post.model');
var notifier = require('../../components/gcm');
var gcm = require('node-gcm');
var mailer=require('../../components/mailer');
var getMembers = require('../wall/wall.controller').getMembers;

// Get list of notifications
exports.index = function(req, res) {
  Notification.find({user: req.user._id}, function (err, notifications) {
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
    .deepPopulate('user post.wall  postedBy.name commentedBy.name post.comments.createdBy')
    .exec( function (err, notification) {
      if(notification.action=='post'){
        var message=notification.postedBy.name +" posted on "+notification.post.wall.name;
        notifier(message, notification.user.deviceId);
        mailer('[sarang-erp-2016] '+ message,notification.post.info,notification.user.email,notification.post._id,false,function cb(err,info){
            if (err){
              return res.json(501,err);
  
            }
            return res.json(200,'Mail has been sent');
        })
      } else {
        var myComment = notification.post.comments.reverse()[0];
        var message=myComment.createdBy.name +" comment on a post by "+
        notification.post.createdBy.name+ " on the " + notification.post.wall.name+" wall";
        notifier(message, notification.user.deviceId);
        mailer(message+'[saarang-erp-2016]',myComment.info,notification.user.email,notification.post._id,true,function cb(err,info){
            if (err){
              return res.json(501,err);
            }
            else{
              return res.json(201, notification);
            }
        });
      }
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
        exports.bulkCreate({post: post, members: members, action: action}, function (err, info) {
          callback();
        });
      });
    });
  });
};

exports.bulkCreate = function(data, callback) {
  var deviceIds = [];
  var emails=[];
  forEach(data.members, function(member, index, arr) {
    var done = this.async();
    if (data.action=='post'){
      Notification.create({post: data.post._id, user: member._id, action: data.action, postedBy: data.post.createdBy._id} , function (err, notification) {
       if(err) { return handleError(res, err); }
       console.log(notification);
       Notification.findById(notification._id)
       .deepPopulate('user post.wall postedBy.name commentedBy.name')
       .exec( function (err, notification) {
          if(!(data.post.createdBy._id === member._id)){
           if(notification.user.deviceId){
            deviceIds = deviceIds.concat(notification.user.deviceId);
           }
           emails.push(notification.user.email);
          }
         done();
       });
     });
    }
    else{
      Notification.create({post: data.post._id, user: member._id, action: data.action, commentedBy: data.post.comments.reverse()[0].createdBy._id} , function (err, notification) {
       if(err) { return handleError(res, err); }
       console.log(notification);
       Notification.findById(notification._id)
       .deepPopulate('user post.wall postedBy.name commentedBy.name')
       .exec( function (err, notification) {
          if(!(data.post.comments.reverse()[0].createdBy._id=== member._id)){
           if(notification.user.deviceId){
            deviceIds = deviceIds.concat(notification.user.deviceId);
           }
           emails.push(notification.user.email);
          }
         done();
       });
     });
    }

  }, function allDone (notAborted, arr) {
    if(data.post.comments.length === 0){
      var message=data.post.createdBy.name +" posted on "+data.post.wall.name;
      notifier(message, deviceIds);
      mailer('[Saarang ERP] ' + data.post.title, data.post.info, emails, data.post._id, false);
    } else {
      var myComment=data.post.comments.reverse()[0];
      var message=myComment.createdBy.name +" comment on a post by "+
      data.post.createdBy.name+ " on the " + data.post.wall.name+" wall";
      notifier(message, deviceIds);
      mailer('[Saarang ERP] ' + data.post.title ,myComment.info, emails, data.post._id, true);
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