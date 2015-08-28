'use strict';

var _ = require('lodash');
var Room = require('./room.model');
var Hostel = require('../hostel/hostel.model');
var Checkin = require('../checkin/checkin.model');
var User = require('../../user/user.model');
var _u = require('underscore');

// Get list of rooms
exports.index = function(req, res) {
  Room.find(function (err, rooms) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(rooms);
  });
};

// Get list of details about all rooms
exports.indexRoomAvailibility = function(req, res) {

  Room.find(function(err, rooms) {
    Checkin.find({ room : {
      $in : rooms
    }, dateCheckout : {
      $exists : false
    }}, function(err, checkins) {
      var checkinsIndexUserId = _u.groupBy(checkins, function(checkin) {
        return checkin.user.toString();
      });
      var user_ids = _u.pluck(checkins, 'user');

      User.find({ _id : {
        $in : user_ids
      }}, function(err, _users) {
        var usersIndexUserId = _u.groupBy(_users, function(_user) {
          return _user._id.toString();
        });
        var usersIndexRoomId = _u.groupBy(_users, function(_user) {
          return checkinsIndexUserId[_user._id.toString()][0].room.toString();
        });

        for(var i=0; i<rooms.length; i++) {
          rooms[i] = rooms[i].toJSON();
          rooms[i].occupants = usersIndexRoomId[rooms[i]._id.toString()] || [];
        }
        return res.status(200).json(rooms);
      });
    });
  });
}

// Get a single room
exports.show = function(req, res) {
  Room.findById(req.params.id, function (err, room) {
    if(err) { return handleError(res, err); }
    if(!room) { return res.status(404).send('Not Found'); }
    return res.json(room);
  });
};

// Creates a new room in the DB.
exports.create = function(req, res) {

    
  Hostel.findById(req.body.hostel,function(err,hostel){
    if (err) { return res.handleError(err,res);}
    if(!hostel){
      return res.send('Hostel Not Found');
    }
    else{
      Room.create(req.body,function(err,room){
        if(err) { return res.handleError(err,res);}
        hostel.push(room._id);
        hostel.save(function (err) {
          if (err) { return handleError(res, err); }
          return res.status(200).json(room);
        });

      })
     
    }
  })










  
};

// Updates an existing room in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Room.findById(req.params.id, function (err, room) {
    if (err) { return handleError(res, err); }
    if(!room) { return res.status(404).send('Not Found'); }
    var updated = _.merge(room, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(room);
    });
  });
};

// Deletes a room from the DB.
exports.destroy = function(req, res) {
  Room.findById(req.params.id, function (err, room) {
    if(err) { return handleError(res, err); }
    if(!room) { return res.status(404).send('Not Found'); }
    room.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}