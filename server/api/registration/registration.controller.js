'use strict';

var _ = require('lodash');
var Registration = require('./registration.model');
var User = require('../websiteUser/websiteUser.model');
var Team = require('../team/team.model');
var Event = require('../event/event.model');
var CurrUser = require('../user/user.model');

// Get list of registrations
exports.index = function(req, res) {
  Registration.find(function (err, registrations) {
    if(err) { return handleError(res, err); }
    return res.json(200, registrations);
  });
};

// Get a single registration
exports.show = function(req, res) {
  Registration.findById(req.params.id, function (err, registration) {
    if(err) { return handleError(res, err); }
    if(!registration) { return res.send(404); }
    return res.json(registration);
  });
};

// Creates a new registration in the DB.
exports.create = function(req, res) {
  // Check if user is in team
  var flag = true;
  console.log("zzzz");
  if(req.user.teams.indexOf(req.body.team)==-1) res.send(403);
  // Check if team is already registered
  // Push in event.registrations
  Event.findById(req.body.eventRegistered)
  .populate('registrations', 'team')
  .exec(function (err, event) {
    console.log("1 ");
    if (err) { return handleError(res, err); }
    if(!event) { return res.send(404); }
    console.log(event.registrations);
    req.user.teams.filter(function(n) {
      event.registrations.filter(function (m) {
        console.log(m.team);
        console.log(n);
        if(m.team.equals(n)) {
          console.log("False");
          flag = false;
          res.send(422);
        }
      });
    });
  }).then(function(){
    if(flag) {
      // Push in team.eventsRegistered
      Team.findById(req.body.team, function(err, team) {
        console.log("2 ");
        if (err) { return handleError(res, err); }
        if(!team) { flag = false; return res.send(404); }
        var updated = _.assign(team, { eventsRegistered: team.eventsRegistered.concat(req.body.eventRegistered) });
        updated.save(function (err) {
          console.log("3 ");
          if (err) { return handleError(res, err); }
          else
          {
            if(flag) {
              // Push in registration
              req.body.registrationTime=Date.now();
              Registration.create(req.body, function(err, registration) {
                console.log("4 ");
                if(err) { return handleError(res, err); }
                Event.findById(req.body.eventRegistered, function(err, event) {
                  var updated = _.assign(event, { registrations: event.registrations.concat(registration._id) });
                  updated.save(function (err) {
                    console.log("5 ");
                    console.log(registration._id);
                    if (err) { return handleError(res, err); }

                    else
                    {
                      console.log(registration._id);
                      CurrUser.findById(req.user._id, function (err, user){
                      console.log(registration._id);
                        console.log("6 ");
                        if (err) { return handleError(res, err); }
                        if(!user) { return res.send(404); }
                        var updated = _.assign(user, { registrations: user.registrations.concat(registration._id) });
                        updated.save(function (err) {
                          console.log("7 ");
                          if (err) { return handleError(res, err); }
                          return res.sendStatus(204);
                        });
                      });
                    }
                  });
                });
              });
            }
          }
        });
      });
    }
  });
};

// Updates an existing registration in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Registration.findById(req.params.id, function (err, registration) {
    if (err) { return handleError(res, err); }
    if(!registration) { return res.send(404); }
    var updated = _.merge(registration, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, registration);
    });
  });
};

// Deletes a registration from the DB.
exports.destroy = function(req, res) {
  Registration.findOne({'eventRegistered': req.params.id}, function (err, registration) {
    if(err) { return handleError(res, err); }
    if(!registration) { return res.send(404); }
    var flag=true;
    Team.findById(registration.team, function(err, team) {
      if (err) { return handleError(res, err); }
      if(!team) { return res.send(404); }
      console.log(req.user._id);
      console.log(team.teamLeader);
      if(req.user._id.equals(team.teamLeader)) {
        console.log(team.teamLeader);
        var i=team.eventsRegistered.indexOf(registration.eventRegistered);
        if(i > -1)
          team.eventsRegistered.splice(i, 1);
        var updated = _.assign(team, { eventsRegistered: team.eventsRegistered });
        updated.save(function (err) {
          if (err) { return handleError(res, err); }
        });
        Event.findById(registration.eventRegistered, function(err, event) {
          if (err) { return handleError(res, err); }
          if(!event) { return res.send(404); }
          var i=event.registrations.indexOf(registration._id);
          if(i > -1)
            event.registrations.splice(i, 1);
          var updated = _.assign(event, { registrations: event.registrations });
          updated.save(function (err) {
            if (err) { return handleError(res, err); }
          });
        });
        registration.remove(function(err) {
          if(err) { return handleError(res, err); }
          return res.send(204);
        });
      }
      else
        return res.send(403);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}