'use strict';

var _ = require('lodash');
var WebsiteUsers = require('./website\-users.model');

//copy from user.controller.js
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var smtpapi    = require('smtpapi');
var Department = require('../department/department.model');
var Team = require('../team/team.model');

var EMAIL = ''; // Put your fest mail id here
var PASSWORD = ''; // Put your fest password here

var validationError = function (res, err) {
  return res.status(422).json(err);
};

function handleError(res, err) {
  return res.status(500).json(err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */

 function festID(count){
   var id;
   if(count<10)
   id = "SHA160000"+count.toString();
   else if(count>9&&count<100)
   id="SHA16000"+count.toString();
   else if(count>99&&count<1000)
   id="SHA1600"+count.toString();
   else if(count>999&&count<10000)
   id="SHA160"+count.toString();
   else if(count>9999&&count<100000)
   id = "SHA16"+count.toString();
   return id;
 }
//end copy

// Get list of website-userss
exports.index = function(req, res) {

  WebsiteUsers.find({}, '-salt -hashedPassword -lastSeen', function (err, users) {
    if(err) return res.json(500, err);
    res.status(200).json(users);
  }).populate('interestedFields','eventsApplied','teams','selfTeam');
};

// Get a single website-users
exports.show = function(req, res) {
  WebsiteUsers.findById(req.params.id, function (err, websiteUsers) {
    if(err) { return handleError(res, err); }
    if(!websiteUsers) { return res.status(404).send('Not Found'); }
    return res.json(websiteUsers);
  });
};

// Creates a new website-users in the DB.
exports.create = function(req, res) {
  /*WebsiteUsers.create(req.body, function(err, website-users) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(website-users);
  });*/

  console.log(req.body);
  var newUser = new WebsiteUsers(req.body);
  newUser.provider = 'local';
  WebsiteUsers.count({},function(err,count){
    newUser.festID = festID(count+1);
  })
  newUser.save(function (err, user) {
    if (err) { console.log(err); return validationError(res, err); }
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    
    var newTeam = new Team({teamName: req.body.name, teamLeader: user._id, teamMembers: [user._id], eventsRegistered: [], selfTeam: true});
    newTeam.save(function (err, team) {
      if(err) { return handleError(res, err); }
      WebsiteUsers.findById(user._id, function (err, user) {
        if(err) return validationError(res, err);
        if(!user) return res.sendStatus(404);
        user.teams = [team._id];
        user.selfTeam = team._id;
        user.save(function (err) {
          if(err) return validationError(res, err);
          return;
        });
      });
      return;
    });
    res.json({ token: token });
  });
};

// Updates an existing website-users in the DB.
exports.update = function(req, res) {
  /*if(req.body._id) { delete req.body._id; }
  WebsiteUsers.findById(req.params.id, function (err, website-users) {
    if (err) { return handleError(res, err); }
    if(!website-users) { return res.status(404).send('Not Found'); }
    var updated = _.merge(website-users, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(website-users);
    });
  });*/

  var userUpdate = req.body;
  // I'm no where using req.params.id here. Do a better algo
  WebsiteUsers.findById(userUpdate.id, function (err, user) {
    if(err) return validationError(res, err);
    if(!user) return res.sendStatus(404);
   
    user.name = userUpdate.name;
    user.gender = userUpdate.gender;
    user.dob = userUpdate.dob;
    user.age = userUpdate.age;
    user.branch = userUpdate.branch;
    user.college = userUpdate.college;
    user.collegeRoll = userUpdate.collegeRoll;
    user.schoolStudent = userUpdate.schoolStudent;
    user.wantAccomodation = userUpdate.wantAccomodation;
    user.city = userUpdate.city;
    user.phoneNumber = userUpdate.phoneNumber;
    user.save(function (err) {
      if(err) return validationError(res, err);
      res.sendStatus(200);
    });
  });
};

// Deletes a website-users from the DB.
exports.destroy = function(req, res) {
  WebsiteUsers.findById(req.params.id, function (err, websiteUsers) {
    if(err) { return handleError(res, err); }
    if(!website-users) { return res.status(404).send('Not Found'); }
    website-users.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}