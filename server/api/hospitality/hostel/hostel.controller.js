'use strict';

var _ = require('lodash');
var Hostel = require('./hostel.model');
var Room = require('../room/room.model');
var Checkin = require('../checkin/checkin.model');
var User = require('../../user/user.model');
var _u = require('underscore');

// Get list of hostels
exports.index = function(req, res) {
  Hostel.find(function (err, hostels) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(hostels);
  });
};

//adding rooms to already existing hostel
exports.addRooms=function (req,res){
 var i=0,k=0;
  var data=req.body.rooms;
  
  Hostel.findById(req.params.id,function(err,hostel){
    if (err){
      return res.handleError(err,res);
    }
    else if(!hostel) { return res.status(404).send('Not Found'); }
    else{
          var c=hostel.rooms.length;
        
        data.forEach(function(reqRoom){
          Room.findById(reqRoom,function(err,room){
            if(err){
              return res.handleError(err,res);
            } 
               
            else{
              i=0;
              k=0;
             
              hostel.rooms.forEach(function(hostelRoom){
              i++;
              if(room.number==hostelRoom.number){
                console.log(room.number+"danger"+reqRoom);
                k=1;
              }
              else {
                 

                 if( i==c && k==0){console.log(room.number+" no danger"+reqRoom); 
                  
              hostel.rooms.push(reqRoom); 
              console.log(hostel.rooms.length);
              
            }}
              });
            }

          });
        })

      
    }
    
  }).populate('rooms');
}














// Get list of rooms for a particular hostel
exports.indexRoomsForHostel = function(req, res) {
  Hostel.findById(req.params.id, function(err, hostel) {
    Checkin.find({ room : {
      $in : hostel.rooms
    }, dateCheckout : {
      $exists : false
    }}, function(err, checkins) {

      //checkins = checkins.toJSON();
      var checkinsIndexUserId = _u.groupBy(checkins, function(checkin) {
        return checkin.user.toString();
      });
      console.log(checkinsIndexUserId);
      var user_ids = _u.pluck(checkins, 'user');

      User.find({ _id : {
        $in : user_ids
      }}, function(err, _users) {
        console.log(checkinsIndexUserId);
        var usersIndexUserId = _u.groupBy(_users, function(_user) {
          return _user._id.toString();
        });
        var usersIndexRoomId = _u.groupBy(_users, function(_user) {
          return checkinsIndexUserId[_user._id.toString()][0].room.toString();
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
  var i=0,j=0;
  var data=req.body.rooms;
  
  data.forEach(function(roomId){
    console.log(roomId);
    Room.findById(roomId,function(err,room){
      if(err){return res.handleError(err,res);}
      data.forEach(function(curRoomId){
        console.log('hi'+curRoomId);
      if(curRoomId==roomId){
        i++; console.log(i);
      }
      else{
        i++; console.log(i);
        Room.findById(curRoomId,function(err,curRoom){
        
          if(curRoom.number==room.number){
            console.log("danger");
            res.statusCode = 404;
            
            res.end('Same Room Number');

          }
          else{
            // if(i==data.length*data.length) {console.log( "no danger");}

          }
        })
      }
      })
    })
   })
  // Hostel.create(req.body, function(err, hostel) {
  //   if(err) { return handleError(res, err); }
  //   return res.status(201).json(hostel);
  // });
  
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