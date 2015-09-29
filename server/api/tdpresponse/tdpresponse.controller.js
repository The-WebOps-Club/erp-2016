'use strict';

/*
TDP Form: (note: "question": "Projec..." not question: "Projec...")
  - creation: POST /api/tdpforms; Example: {event: "559b60e951e14fde159bb997", questions: [{"question": "Project title", "type": "text"}, {"question": "Do you have previous experience?", "type": "option", "options": ["Yes", "No"]}]}
  - update:   PUT /api/tdpforms;  Example: Same as POST

TDP Response:
  After creating a form (with proper format), a user can:
    - creation: POST /api/tdpresponses; Example: {tdpform: "5606e3aa4238a5ad4c37141d", team: "55c896d22a75767c0917a6f4", response: [{"answer": "Turing machine"}, {"answer": "Yes"}]}
    - update:   PUT  /api/tdpresponses/5606e3aa4238a5ad4c37141d (the id is the tdpform id); Same payload format
    - delete:   DELETE /api/tdpresponses/5606e3aa4238a5ad4c37141d

- The response will be verified backend to ensure that it matches the question format
- Only a team member from the team for a particular TDP response will be able to update it
- Only coords can create, update, and delete TDP Forms
*/

var _ = require('lodash');
var Tdpresponse = require('./tdpresponse.model');
var Tdpform = require('../tdpform/tdpform.model');
var Team = require('../team/team.model');
var User = require('../user/user.model');

// Get a single tdpresponse
exports.index = function(req, res) {
  Tdpresponse.find({'tdpform': req.params.id})
  .populate('team')
  .exec(function (err, tdpresponse) {
    if(err) { return handleError(res, err); }
    if(!tdpresponse) { return res.send(404); }
    return res.json(tdpresponse);
  });
};

// Get list of tdpresponses
exports.show = function(req, res) {
  Tdpresponse.findOne({team: req.params.team, tdpform: req.params.tdpform}, function (err, tdpresponses) {
    if(err) { return handleError(res, err); }
    return res.json(200, tdpresponses);
  });
};

// Creates a new tdpresponse in the DB.
exports.create = function(req, res) {
  Tdpresponse.count({team: req.body.team, tdpform: req.body.tdpform}, function (err, count) {
    if(count>0)
      return res.send(401, "Unauthorized");
    else {
      if(req.body.tdpform && req.body.response) {
        req.body.response=JSON.parse(req.body.response);
        var tdpresponse=req.body.response;
        var tdpform=req.body.tdpform;
        var ret=true;
        Tdpform.findById(tdpform, function (err, form) {
          if (err) { ret=false; }
          if(!form) { return res.send(404); }
          var qs=form.questions;
          for(var i=0; i<qs.length; i++) {
            if(qs[i].type=="text" && tdpresponse[i].answer)
              continue;
            if(qs[i].type=="option" && tdpresponse[i].answer) {
              var a=tdpresponse[i].answer, flag=false;
              for(var j=0; j<qs[i].options.length; j++) {
                if(a==qs[i].options[j])
                  flag=true;
              }
              if(flag)
                continue;
            }
            ret=false;
          }
          if(ret) {
            Tdpresponse.create(req.body, function(err, tdpresponse) {
              if(err) { return handleError(res, err); }
              form.responses.push(tdpresponse._id);
              var updated = _.merge(form, {responses: form.responses});
              updated.save(function (err) {
                if (err) { return handleError(res, err); }
              });
              return res.json(201, tdpresponse);
            });
          }
          else
            return res.send(500, "Invalid request");
        });
      }
      else
        return res.send(500, "Invalid request");
    }
  });
};

// Updates an existing tdpresponse in the DB.
exports.update = function(req, res) {
  req.body.response=JSON.parse(req.body.response);
  if(req.body._id) { delete req.body._id; }
  Tdpresponse.findById(req.params.id, function (err, tdpresponse) {
    if (err) { return handleError(res, err); }
    if(!tdpresponse) { return res.send(404); }
    Team.findById(tdpresponse.team, function(err, team) {
      if(err) { return handleError(res, err); }
      if(team.teamMembers.indexOf(req.user._id)!=-1) {
        var updated = _.merge(tdpresponse, {response: req.body.response});
        updated.save(function (err) {
          if (err) { return handleError(res, err); }
          return res.json(200, tdpresponse);
        });
      }
      else
        return res.send(401, "Unauthorized");
    });
  });
};

// Updates an existing tdpresponse in the DB.
exports.toggle = function(req, res) {
  Tdpresponse.findById(req.params.id, function (err, tdpresponse) {
    if (err) { return handleError(res, err); }
    if(!tdpresponse) { return res.send(404); }
    Team.findById(tdpresponse.team, function(err, team) {
      if(err) { return handleError(res, err); }
      if(team.teamMembers.indexOf(req.user._id)!=-1) {
        console.log(tdpresponse);
        var updated = _.merge(tdpresponse, {isSelected: !tdpresponse.isSelected});
        updated.save(function (err) {
          if (err) { return handleError(res, err); }
          return res.json(200, tdpresponse);
        });
      }
      else
        return res.send(401, "Unauthorized");
    });
  });
};

// Deletes a tdpresponse from the DB.
exports.destroy = function(req, res) {
  Tdpresponse.findById(req.params.id, function (err, tdpresponse) {
    if(err) { return handleError(res, err); }
    if(!tdpresponse) { return res.send(404); }
    tdpresponse.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}