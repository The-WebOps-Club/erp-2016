'use strict';

var _ = require('lodash');
var Team = require('./team.model');
var User = require('../user/user.model');

// Get list of teams
exports.index = function(req, res) {
  User.findById(req.user._id)
  .populate('teams', 'teamMembers eventsRegistered teamName teamLeader selfTeam')
  .exec(function (err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    var name = {
      path: 'teams.teamLeader teams.teamMembers',
      model: 'User',
      select: 'name'
    };
    User.populate(user, name, function (err, teams) {
      console.log(teams.teams);
      return res.json(teams.teams);
    });
  });
};

// Get a single team
exports.show = function(req, res) {
  Team.findById(req.params.id, function (err, team) {
    if(err) { return handleError(res, err); }
    if(!team) { return res.send(404); }
    return res.json(team);
  });
};

// Creates a new team in the DB.
exports.create = function(req, res) {
  Team.create(req.body, function(err, team) {
    if(err) { return handleError(res, err); }
    return res.json(201, team);
  });
};

// Updates an existing team in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Team.findById(req.params.id, function (err, team) {
    if (err) { return handleError(res, err); }
    if(!team) { return res.send(404); }
    var updated = _.merge(team, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, team);
    });
  });
};

exports.leave = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Team.findById(req.params.id, function (err, team) {
    if (err) { return handleError(res, err); }
    if(!team) { return res.send(404); }
    if(team.selfTeam) { return res.send(400); }
    var index=team.teamMembers.indexOf(req.user._id);
    if(index > -1)
      team.teamMembers.splice(index, 1);
    var updated = _.merge(team, { teamMembers: team.teamMembers });
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return;
    });
  });
  User.findById(req.user._id, function(err, user) {
    if (err) { return handleError(res, err); }
    if(!user) { return res.send(404); }
    var index=user.teams.indexOf(req.params.id);
    if(index > -1)
      user.teams.splice(index, 1);
    var updated = _.merge(user, { teams: user.teams });
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.send(200);
    });
  });
}

// Deletes a team from the DB.
exports.destroy = function(req, res) {
  Team.findById(req.params.id, function (err, team) {
    if(err) { return handleError(res, err); }
    if(!team) { return res.send(404); }
    team.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}