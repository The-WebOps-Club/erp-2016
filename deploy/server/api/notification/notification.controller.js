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
var moment = require('moment');
var NOTIFICATIONSPERPAGE = 10;

// Get list of notifications
exports.index = function(req, res) {
  Notification.paginate({user: req.user._id}, req.params.page, NOTIFICATIONSPERPAGE, function(error, pageCount, paginatedResults, itemCount) {
    if(error) {
      return handleError(res, error);
    }
    else {
      var populated = [];
      forEach(paginatedResults, function(notification, index, arr) {
        var done = this.async();
        notification.deepPopulate('postedBy commentedBy', 'name', function (err, _notification) {
          _notification.deepPopulate('post', 'wall createdBy', function (err, _notif) {
            populated.push(_notif);
            done();
          })
        });
      }, function allDone (notAborted, arr) {
        res.status(200).send(populated);
      });
    }
  }, {sortBy: {updatedOn: 1}});
};

exports.viewAll = function(req, res) {
  Notification.find({user: req.user._id}, function (err, notifications) {
    if(err) {
      return handleError(res, err);
    }
    else {
      var populated = [];
      forEach(notifications, function(notification, index, arr) {
        var done = this.async();
        notification.deepPopulate('postedBy commentedBy', 'name', function (err, _notification) {
          _notification.deepPopulate('post', 'wall createdBy', function (err, _notif) {
            populated.push(_notif);
            done();
          })
        });
      }, function allDone (notAborted, arr) {
        res.status(200).send(populated);
      });
    }
  }, {sortBy: {updatedOn: 1}});
};

exports.refresh = function(req, res) {
  Notification.find({
    user: req.user._id, 
    updatedOn:{
      $gt: req.body.date
    }
  }, function (err, notifications) {
    if(err) { return handleError(res, err); }
    var populated = [];
    forEach(notifications, function(notification, index, arr) {
      var done = this.async();
      notification.deepPopulate('postedBy commentedBy', 'name', function (err, _notification) {
        _notification.deepPopulate('post', 'wall createdBy', function (err, _notif) {
          populated.push(_notif);
          done();
        })
      });
    }, function allDone (notAborted, arr) {
      res.status(200).send(populated);
    });
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
      if((data.post.createdBy._id.toString() === member._id.toString())){
        done();
      }
      else {
        Notification.create({post: data.post._id, user: member._id, action: data.action, postedBy: data.post.createdBy._id, updatedOn: Date.now()} , function (err, notification) {
         if(err) { return handleError(res, err); }
         Notification.findById(notification._id)
         .deepPopulate('user post.wall postedBy.name commentedBy.name')
         .exec( function (err, notification) {
           if(notification.user.deviceId){
            deviceIds = deviceIds.concat(notification.user.deviceId);
          }
          emails.push(notification.user.email);
          done();
        });
       });
      }
    }
    else{
      if((data.post.comments.reverse()[0].createdBy._id.toString() === member._id.toString())){
        done();
      }
      else {
        Notification.find({post: data.post._id, user: member._id, action: data.action}, function (err, notification) {
          if (notification.length != 0){
            notification = notification[0]
            notification.commentedBy.push(data.post.comments.reverse()[0].createdBy._id);
            notification.updatedOn = Date.now();
            notification.save(function (err, notification) {
              if (err) { console.log(err); return validationError(res, err); }
            });
            Notification.findById(notification._id)
              .deepPopulate('user post.wall postedBy.name commentedBy.name')
              .exec( function (err, notification) {
                if(notification.user.deviceId){
                  deviceIds = deviceIds.concat(notification.user.deviceId);
                }
                emails.push(notification.user.email);
                done();
              });
          }
          else{
            Notification.create({post: data.post._id, user: member._id, action: data.action, commentedBy: data.post.comments.reverse()[0].createdBy._id, updatedOn: Date.now()} , function (err, notification) {
             if(err) { return handleError(res, err); }
             Notification.findById(notification._id)
             .deepPopulate('user post.wall postedBy.name commentedBy.name')
             .exec( function (err, notification) {
               if(notification.user.deviceId){
                deviceIds = deviceIds.concat(notification.user.deviceId);
              }
              emails.push(notification.user.email);
              done();
            });
          });
        }
       });
      }
    }

  }, function allDone (notAborted, arr) {
    if(data.post.comments.length === 0){
      var message=data.post.createdBy.name +" posted on "+data.post.wall.name;
      //var emailText = message + ":\n" + data.post.info;
      console.log(data.post.wall);
      
      var emailText='<img src="http://saarang.org/2014/landing/assets/images/saarang_button.png" style="width:60px;height:60px;"><font size="4" color="blue">Saarang ERP -'+data.post.createdBy.name+ ' has posted on '+data.post.wall.name+
      '</font><hr><br><br><font size="3">'+data.post.info+'</font><font size="2"><br><br>'+moment(data.post.updatedOn).format('MMMM Do YYYY, h:mm:ss a')+'<br><br><br><a href="http://localhost:9000/profile/'+data.post.wall.parentId+'">View Conversation</a><p>    Thank you,    <br />    Saarang Team  </p></font>';
      notifier(message, deviceIds);
      mailer('[Saarang ERP] ' + data.post.title, emailText, emails, data.post._id, false);
    } else {
      var myComment=data.post.comments.reverse()[0];
      var message=myComment.createdBy.name +" comment on a post by "+
      data.post.createdBy.name+ " on the " + data.post.wall.name+" wall";
      //var emailText = message + ":\n" + myComment.info;
      var emailText='<img src="http://saarang.org/2014/landing/assets/images/saarang_button.png" style="width:60px;height:60px;"><font size="4" color="blue">Saarang ERP -'+myComment.createdBy.name+ ' has commented on a post by '+data.post.createdBy.name+" on the " + data.post.wall.name+"'s wall"+
      '</font><hr><br><br><font size="3">'+myComment.info+'</font><font size="2"><br><br>'+moment(myComment.updatedOn).format('MMMM Do YYYY, h:mm:ss a')+'<br><br><br><a href="http://localhost:9000/profile/'+data.post.wall.parentId+'">View Conversation</a><p>    Thank you,    <br />    Saarang Team  </p></font>';
      notifier(message, deviceIds);
      mailer('[Saarang ERP] ' + data.post.title , emailText, emails, data.post._id, true);
    }
    callback();
  });
};

//Marks a notification as seen
exports.markAsSeen = function(req, res) {
  Notification.findById(req.params.id, function (err, notification) {
    if (err) { return handleError(res, err); }
    if(!notification) { return res.send(404); }
    var updated = _.merge(notification, {active: false});
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, notification);
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