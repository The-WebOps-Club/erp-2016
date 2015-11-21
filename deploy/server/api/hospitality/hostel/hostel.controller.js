'use strict';

var _ = require('lodash');
var Hostel = require('./hostel.model');
var Room = require('../room/room.model');
var Checkin = require('../checkin/checkin.model');
var Visitor = require('../../visitor/visitor.model');
var _u = require('underscore');

// Get list of hostels
exports.index = function(req, res) {
  Hostel.find(function (err, hostels) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(hostels);
  });
};

//adding rooms to already existing hostel

// Get list of details about rooms for a particular hostel
exports.indexRoomAvailability = function(req, res) {
  Hostel.findById(req.params.id, function(err, hostel) {
    Checkin.find({ room : {
      $in : hostel.rooms
    }, dateCheckout : {
      $exists : false
    }}, function(err, checkins) {
      var checkinsIndexVisitorId = _u.groupBy(checkins, function(checkin) {
        return checkin.visitor.toString();
      });
      var visitor_ids = _u.pluck(checkins, 'visitor');

      Visitor.find({ _id : {
        $in : visitor_ids
      }}, function(err, _visitors) {
        var visitorsIndexVisitorId = _u.groupBy(_visitors, function(_visitor) {
          return _visitor._id.toString();
        });
        var visitorsIndexRoomId = _u.groupBy(_visitors, function(_visitor) {
          return checkinsIndexVisitorId[_visitor._id.toString()][0].room.toString();
        });
        Room.find({ _id : {
          $in : hostel.rooms
        }}, function(err, rooms) {
          for(var i=0; i<rooms.length; i++) {
            rooms[i] = rooms[i].toJSON();
            rooms[i].occupants = visitorsIndexRoomId[rooms[i]._id.toString()] || [];
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