'use strict';

var _ = require('lodash');
var Hostel = require('./hostel.model');
var Room = require('../room/room.model');
var Checkin = require('../checkin/checkin.model');
var _u = require('underscore');

// Get list of hostels
exports.index = function(req, res) {
  Hostel.find(function (err, hostels) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(hostels);
  });
};

// Get list of rooms for a particular hostel
exports.indexRoomsForHostel = function(req, res) {
  Hostel.findById(req.params.id, function(err, hostel) {
    Checkin.find({ room : {
      $in : hostel.rooms
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
          return checkinsIndexUserId[_user._id.toString()].room.toString();
        });
        Room.find({ _id : {
          $in : hostel.rooms
        }}, function(err, rooms) {
          for(var i=0; i<rooms.length; i++) {
            rooms[i] = rooms[i].toJSON();
            rooms[i].occupants = usersIndexRoomId[rooms[i]._id.toString()];
          }
          hostel = hostel.toJSON();
          hostel.rooms = rooms;
          return res.status(200).json(hostel);
        });
      });
    });
  });
}

// Get a single hostel
exports.show = function(req, res) {
  Hostel.findById(req.params.id, function (err, hostel) {
    if(err) { return handleError(res, err); }
    if(!hostel) { return res.status(404).send('Not Found'); }
    return res.json(hostel);
  });
};

// Creates a new hostel in the DB.
exports.create = function(req, res) {
  Hostel.create(req.body, function(err, hostel) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(hostel);
  });
};

// Updates an existing hostel in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Hostel.findById(req.params.id, function (err, hostel) {
    if (err) { return handleError(res, err); }
    if(!hostel) { return res.status(404).send('Not Found'); }
    var updated = _.merge(hostel, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(hostel);
    });
  });
};

// Deletes a hostel from the DB.
exports.destroy = function(req, res) {
  Hostel.findById(req.params.id, function (err, hostel) {
    if(err) { return handleError(res, err); }
    if(!hostel) { return res.status(404).send('Not Found'); }
    hostel.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}