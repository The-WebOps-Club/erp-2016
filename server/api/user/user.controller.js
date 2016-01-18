'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var smtpapi    = require('smtpapi');
var Team = require('../team/team.model');
var College = require('../college/college.model');
var api_key = '';
var sendgrid = require('sendgrid')(api_key);
var mongoose = require('mongoose');

var EMAIL = ''; // Put your fest mail id here
var PASSWORD = ''; // Put your fest password here

var Event = require('../event/event.model');

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

function festID (count) {
  var id;
  if(count<10) {
    id = "SHA160000" + count.toString();
  }
  else if(count>9 && count<100) {
    id="SHA16000" + count.toString();
  }
  else if(count>99 && count<1000) {
    id="SHA1600" + count.toString();
  }
  else if(count>999 && count<10000) {
    id="SHA160" + count.toString();
  }
  else if(count>9999 && count<100000) {
    id = "SHA16" + count.toString();
  }
  return id;
}

exports.getAllEmails = function (req, res) {
  User.find({'role': 'user'}, 'name secondName email -_id', function (err, users) {
    if(err) return res.json(500, err);
    res.status(200).json(users);
  });
};

// exports.sendMail = function (req, res) {
//   var text_body = "Hello,\n\nWe are delighted to have you as a registered member.\n\nYou can create your teams and register to events or workshops in your Dashboard(http://shaastra.org/#/dashboard)\n\nStay tuned to our pages for regular updates,\nFacebook: https://www.facebook.com/Shaastra/\nTwitter: https://twitter.com/ShaastraIITM\nYouTube: https://www.youtube.com/user/iitmshaastra\n\nBest,\nShaastra 2016 team";
//   var html_body = "<table style=\"background-color: #f3f3f3; font-family: verdana, tahoma, sans-serif; color: black; padding: 30px;\"> <tr> <td> <h2>Hello,</h2> <p>We are delighted to have you as a registered member.</p> <p>You can create your teams and register to events or workshops in your <a target='_blank' href='http://shaastra.org/#/dashboard'>Dashboard</a></p> <p>Stay tuned to our pages for regular updates,</p> <p> <a target='_blank' href='https://www.facebook.com/Shaastra/'>Facebook</a>, <a target='_blank' href='https://twitter.com/ShaastraIITM'>Twitter</a>, <a target='_blank' href='https://www.youtube.com/user/iitmshaastra'>YouTube</a> </p> Best,<br/> Shaastra 2016 team</p> </td> </tr> </table>";
//   var params = {
//     to: 'mku1990@gmail.com',
//     from: 'noreply@shaastra.org',
//     fromname: 'Shaastra WebOps',
//     subject: 'Welcome to Shaastra 2016',
//     replyto: 'webops@shaastra.org',
//     text: text_body,
//     html: html_body
//   };
//   var email = new sendgrid.Email(params);
//   sendgrid.send(email, function (err, json) {
//     if (err) { console.log('err', err); return handleError(res, err); }
//     console.log(json);
//   });
// };

exports.getSisFellows = function(req, res) {
  User.find({'interestedInShaastraFellowship': true}, function (err, users) {
    if(err) { return handleError(res, err); }
  })
  .populate('college', 'collegeName')
  .populate('teams', 'eventsRegistered')
  .exec(function (err, users) {
    if(err) { return handleError(res, err); }
    if(!users) { return res.sendStatus(404); }
    else {
      var eventDetails = {
        path: 'teams.eventsRegistered',
        model: 'Event',
        select: 'name _id shaastraFellowship'
      };
      Event.populate(users, eventDetails, function (err, updatedUsers) {
        return res.json(updatedUsers);
      });
    }
  });
};

exports.index = function (req, res) {
  User.find({}, '-salt -hashedPassword -lastSeen', function (err, users) {
    if(err) return res.json(500, err);
    res.status(200).json(users);
  })
  .populate('department', 'name');
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.role = 'user';
  newUser.provider = 'local';
  newUser.createdOn = Date.now();
  newUser.updatedOn = Date.now();
  User.count({}, function (err, count) {
    newUser.festID = festID(count+1);
  });
  newUser.save(function (err, user) {
    if (err) { console.log(err); return validationError(res, err); }
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });

    var newTeam = new Team({teamName: req.body.name, teamLeader: user._id, teamMembers: [user._id], eventsRegistered: [], selfTeam: true});
    newTeam.save(function (err, team) {
      if(err) { return handleError(res, err); }
      User.findById(user._id, function (err, user) {
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
    //remove the following code
    // College.findById(req.body.collegeID, function(err, college){
    //   newUser.college=college
    //   newUser.save(function(err, user){
    //     if(user) {
    //       console.log(user);
    //     }
    //   })
    // })

    var text_body = "Hello " + user.name + " " + user.secondName + ",\nGreetings from Shaastra-2016 team.\n\nWe are delighted to have you as a registered member.\n\nYou can create your teams and register to events or workshops in your Dashboard(http://shaastra.org/#/dashboard).\n\nThis year Shaastra will open up exciting new avenues for you and make you see tech in a way that you've never seen before. The host of events, shows and workshops that we have lined up will certainly leave you awe-inspired and wanting more. All that we ask in return is a crazy amount of enthusiasm!! Stay tuned to our pages for regular updates,\nFacebook: https://www.facebook.com/Shaastra/\nTwitter: https://twitter.com/ShaastraIITM\nYouTube: https://www.youtube.com/user/iitmshaastra\n\nBest,\nShaastra 2016 team";
    var html_body = "<table style=\"background-color: #f3f3f3; font-family: verdana, tahoma, sans-serif; color: black; padding: 30px;\"> <tr> <td> <h2>Hello " + user.name + " " + user.secondName + ",</h2> <p>Greetings from Shaastra-2016 team.</p> <p>We are delighted to have you as a registered member.</p> <p>You can create your teams and register to events or workshops in your <a target='_blank' href='http://shaastra.org/#/dashboard'>Dashboard</a>.</p> <p>This year Shaastra will open up exciting new avenues for you and make you see tech in a way that you've never seen before. The host of events, shows and workshops that we have lined up will certainly leave you awe-inspired and wanting more. All that we ask in return is a crazy amount of enthusiasm!! Stay tuned to our pages for regular updates,</p> <p> <a target='_blank' href='https://www.facebook.com/Shaastra/'>Facebook</a>, <a target='_blank' href='https://twitter.com/ShaastraIITM'>Twitter</a>, <a target='_blank' href='https://www.youtube.com/user/iitmshaastra'>YouTube</a> </p> Best,<br/> Shaastra 2016 team</p> </td> </tr> </table>";
    var params = {
      to: user.email,
      from: 'support@shaastra.org',
      fromname: 'Shaastra WebOps',
      subject: 'Welcome to Shaastra 2016',
      replyto: 'chinni@shaastra.org',
      text: text_body,
      html: html_body
    };
    var email = new sendgrid.Email(params);
    sendgrid.send(email, function (err, json) {
      console.log('Error sending mail - ', err);
      console.log('Success sending mail - ', json);
    });

    res.json({ token: token });

  });


  // College.findById(req.body.college, function (err, college) {
  //   if (err) { return handleError(res, err); }
  //   if(!college) { return res.sendStatus(400); }
  //   else {

      // newUser.save(function (err, user) {
      //   if (err) { console.log(err); return validationError(res, err); }
      //   var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });

      //   var newTeam = new Team({teamName: req.body.name, teamLeader: user._id, teamMembers: [user._id], eventsRegistered: [], selfTeam: true});
      //   newTeam.save(function (err, team) {
      //     if(err) { return handleError(res, err); }
      //     User.findById(user._id, function (err, user) {
      //       if(err) return validationError(res, err);
      //       if(!user) return res.sendStatus(404);
      //       user.teams = [team._id];
      //       user.selfTeam = team._id;
      //       user.save(function (err) {
      //         if(err) return validationError(res, err);
      //         return;
      //       });
      //     });
      //     return;
      //   });

      //   var text_body = "Hello " + user.name + " " + user.secondName + ",\nGreetings from Shaastra-2016 team.\n\nWe are delighted to have you as a registered member.\n\nYou can create your teams and register to events or workshops in your Dashboard(http://shaastra.org/#/dashboard).\n\nThis year Shaastra will open up exciting new avenues for you and make you see tech in a way that you've never seen before. The host of events, shows and workshops that we have lined up will certainly leave you awe-inspired and wanting more. All that we ask in return is a crazy amount of enthusiasm!! Stay tuned to our pages for regular updates,\nFacebook: https://www.facebook.com/Shaastra/\nTwitter: https://twitter.com/ShaastraIITM\nYouTube: https://www.youtube.com/user/iitmshaastra\n\nBest,\nShaastra 2016 team";
      //   var html_body = "<table style=\"background-color: #f3f3f3; font-family: verdana, tahoma, sans-serif; color: black; padding: 30px;\"> <tr> <td> <h2>Hello " + user.name + " " + user.secondName + ",</h2> <p>Greetings from Shaastra-2016 team.</p> <p>We are delighted to have you as a registered member.</p> <p>You can create your teams and register to events or workshops in your <a target='_blank' href='http://shaastra.org/#/dashboard'>Dashboard</a>.</p> <p>This year Shaastra will open up exciting new avenues for you and make you see tech in a way that you've never seen before. The host of events, shows and workshops that we have lined up will certainly leave you awe-inspired and wanting more. All that we ask in return is a crazy amount of enthusiasm!! Stay tuned to our pages for regular updates,</p> <p> <a target='_blank' href='https://www.facebook.com/Shaastra/'>Facebook</a>, <a target='_blank' href='https://twitter.com/ShaastraIITM'>Twitter</a>, <a target='_blank' href='https://www.youtube.com/user/iitmshaastra'>YouTube</a> </p> Best,<br/> Shaastra 2016 team</p> </td> </tr> </table>";
      //   var params = {
      //     to: user.email,
      //     from: 'support@shaastra.org',
      //     fromname: 'Shaastra WebOps',
      //     subject: 'Welcome to Shaastra 2016',
      //     replyto: 'chinni@shaastra.org',
      //     text: text_body,
      //     html: html_body
      //   };
      //   var email = new sendgrid.Email(params);
      //   sendgrid.send(email, function (err, json) {
      //     console.log('Error sending mail - ', err);
      //     console.log('Success sending mail - ', json);
      //   });

      //   res.json({ token: token });

      // });

  //   }
  // });
};

exports.QmsRegistrations = function(req, res) {
  if(req.query.id) {
    User.findOne({'festID':req.query.id}, '-salt -hashedPassword -lastSeen -rollNumber -emailVerified -interestedInShaastraFellowship -branch -sendEmails -cgpa -summerLocation -role -provider -teams -selfTeam', function (err, user) {
      if(err) return res.json(500, err);
      var finalRes = { 'data': user };
      res.status(200).json(finalRes);
    })
    .populate('college');
  } 
  if(req.query.email) {
    User.findOne({'email':req.query.email}, '-salt -hashedPassword -lastSeen -rollNumber -emailVerified -interestedInShaastraFellowship -branch -sendEmails -cgpa -summerLocation -role -provider -teams -selfTeam', function (err, user) {
      if(err) return res.json(500, err);
      var finalRes = { 'data': user };
      res.status(200).json(finalRes);
    })
    .populate('college');
  }
};

exports.QmsUpdateUser = function (req, res) {
  
};

// Toggle sis-fellowship
exports.sisFellowship = function(req, res) {
  User.findById(req.user._id, function (err, user) {
    user.interestedInShaastraFellowship = true;
    user.save(function (err) {
      if (err) return validationError(res, err);
      res.sendStatus(200);
    });
  });
};

exports.createCollege = function (req, res, next){
  var c = new College(req.body)
  c.save(function(err, college){
    if(err) return next(err);
    console.log(college);
    res.status(200).json(college);
  })
}

exports.getColleges = function (req, res, next){
  College.find({}, function(err, colleges){
    if(err) return next(err);
    if(!colleges) return res.sendStatus(404);
    res.status(200).json(colleges);
  });
}

exports.getByFestID = function (req, res, next){
  User.findOne({festID:req.body.festID}, function(err, user){
    if(err) return next(err);
    if(!user) return res.sendStatus(404);
    res.status(200).json(user);
  })
  .populate('college');
};

exports.getAllUsers = function (req, res){
  console.log("RIght here")
  User.find({}, '-salt -hashedPassword -lastSeen', function(err, users){
    if(err) return res.json(500, err);
    res.status(200).json(users);
  })
  .populate('college');
};

exports.getAllUsersSince = function (req, res){
  console.log("RIght here")
  User.find({updatedOn:{$gt:req.body.last_fetched_date}}, '-salt -hashedPassword -lastSeen', function(err, users){
    if(err) return res.json(500, err);
    res.status(200).json(users);
  })
  .populate('college');
};

exports.getCurrentTime = function (req, res){
  res.status(200).json({date: Date.now()});
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.sendStatus(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err, user) {
    if(err) return res.status(500).json(err);
    return res.sendStatus(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function (req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  console.log(req.params);
  console.log(req.user._id);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function (err) {
        if (err) return validationError(res, err);
        res.sendStatus(200);
      });
    } else {
      res.sendStatus(403);
    }
  });
};

/**
 * Updates a users profile details
 */
exports.updateProfile = function (req, res, next) {
  var userId = req.user._id;
  var userUpdate = req.body.userUpdate;

  // I'm no where using req.params.id here. Do a better algo
  User.findById(userId, function (err, user) {
    if(err) return validationError(res, err);
    if(!user) return res.sendStatus(404);
    user.name = userUpdate.name;
    user.secondName = userUpdate.secondName;
    user.email = userUpdate.email;
    user.phoneNumber = userUpdate.phoneNumber;
    user.wantAccomodation = userUpdate.wantAccomodation;
    user.city = userUpdate.city;
    user.state = userUpdate.state;
    user.stream = userUpdate.stream;
    user.degree = userUpdate.degree;
    user.updatedOn = Date.now();
    user.save(function (err) {
      if(err) return validationError(res, err);
      res.sendStatus(200);
    });
  });
};

exports.updateEverything = function(req, res, next){
  var userUpdate = new User(req.body.userUpdate);
  // console.log(userUpdate)
  User.findById(userUpdate._id, '-salt -hashedPassword', function(err, user){
    if(err) return validationError(res, err);
    if(!user) return res.sendStatus(404);
    user.name = userUpdate.name;
    user.age = userUpdate.age;
    user.secondName = userUpdate.secondName;
    user.email = userUpdate.email;
    user.phoneNumber = userUpdate.phoneNumber;
    user.wantAccomodation = userUpdate.wantAccomodation;
    user.schoolStudent = userUpdate.schoolStudent;
    user.college = userUpdate.college;
    user.city = userUpdate.city;
    user.barcodeID = userUpdate.barcodeID;
    user.state = userUpdate.state;
    user.stream = userUpdate.stream;
    user.degree = userUpdate.degree;
    user.updatedOn = Date.now();
    user.save(function (err, doc) {
      if(err) return validationError(res, err);
      User.findById(doc._id, '-salt -hashedPassword', function(err, result){
        if(err) return next(err);
        if(!result) return res.sendStatus(404);
        res.status(200).json(result);
      })
      .populate('college');
    });
  })

  // res.sendStatus(200)
};

/**
 * Get my info
 */
exports.me = function (req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function (err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.sendStatus(401);
    res.json(user);
  })
  .populate('selfTeam', 'teamName _id');
};

/**
 * Add any user to any department as a coord
 * @param {req.body.department} : Department ID
 * @param {req.body.user} : User ID
 * @param {Function} : User and Department IDs are sent
 *                     in the body of the request.
 *                     Using that we see if user already exists in department
 *                     or if Department already exists in the user
 */
exports.addDepartment = function (req, res, next) {
  User.findById(req.body.user, function (err, user) {
    Department.findById(req.body.department, function (err, department) {
      if(err) {
        return handleError(res, err);
      }
      if(!department) {
        return res.sendStatus(404);
      }
      if (department[req.body.role].indexOf(user._id) == -1){
        department[req.body.role].push(user._id);
        department.save(function (err) {
          if(err) { return handleError(res, err); }
        });
      }
      if(user.department.indexOf(department._id) == -1){
        user.department.push(req.body.department);
        user.updatedOn = Date.now();
        user.save(function (err) {
          if(err) { return handleError(res, err); }
          res.sendStatus(200);
        });
      }
      else res.sendStatus(200);
    });
  });
};

/**
 * Add any user to a SubDepartment
 * @param {req.body.subDepartment}   req  SubDepartment ID
 * @param {req.body.user}   req  User ID
 * @param {Function} User and SubDepartment IDs are sent
 *                   in the body of the request.
 *                   Using that we see if user already exists in subDepartment
 *                   or if SubDepartment already exists in the user
 */
exports.addSubDepartment = function(req, res, next) {
  User.findById(req.body.user, function (err, user) {
    SubDepartment.findById(req.body.subDepartment, function (err, subDepartment) {
      if(err) {
        return handleError(res, err);
      }
      if(!subDepartment) {
        return res.sendStatus(404);
      }
      if (subDepartment[req.body.role].indexOf(user._id) == -1){
        subDepartment[req.body.role].push(user._id);
        subDepartment.save(function (err) {
          if(err) { return handleError(res, err); }
          if(user.subDepartment(subDepartment._id) == -1){
            user.subDepartment.push(req.body.subDepartment);
            user.updatedOn = Date.now();
            user.save(function (err) {
              if(err) { return handleError(res, err); }
              res.sendStatus(200);
            });
          }
        });
      }
      else res.sendStatus(200);
    });
  });
};

/**
 * Sends a mail to the user to reset the password
 *
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.forgotPassword = function(req, res, next) {

  async.waterfall([
    function (done) {
      crypto.randomBytes(25, function (err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function (token, done) {
      User.findOne({ email: req.body.email }, function (err, user) {
        if(err) { return handleError(res, err); }
        if(!user) { return res.sendStatus(404); }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // one hour

        user.save(function (err) {
          done(err, token, user);
        })
      })
    },
    function (token, user, done) {

      var text_body = "Hello " + user.name + " " + user.secondName + ",\nGreetings from Shaastra-2016 team.\n\n" +
        "You have received this email since you have requested for password change for your Shaastra account.\n\n" +
        "Please click on the following link, or paste this into your browser to complete the process:\n" +
        "http://shaastra.org/#/reset-password/" + token + "\n" +
        "If you did not request this, please ignore this email and your password will remain unchanged." +
        "Best,\nShaastra 2016 team";
      var html_body = "<table style=\"background-color: #f3f3f3; font-family: verdana, tahoma, sans-serif; color: black; padding: 30px;\">" +
        "<tr> <td>" +
        "<h2>Hello " + user.name + " " + user.secondName + ",</h2>" +
        "<p>Greetings from Shaastra-2016 team.</p>" +
        "<p>You have received this email since you have requested for password change for your Shaastra account.</p>" +
        "<p>Please click on the following link, or paste this into your browser to complete the process:" +
        "<p>http://shaastra.org/#/reset-password/" + token + "</p>"
        "<p>If you did not request this, please ignore this email and your password will remain unchanged.</p>" +
        "Best,<br/> Shaastra 2016 team</p> </td> </tr> </table>";
      var params = {
        to: user.email,
        from: 'support@shaastra.org',
        fromname: 'Shaastra WebOps',
        subject: 'Account Password Reset - Shaastra',
        replyto: 'chinni@shaastra.org',
        text: text_body,
        html: html_body
      };
      var email = new sendgrid.Email(params);
      sendgrid.send(email, function (err, json) {
        console.log('Error sending mail - ', err);
        console.log('Success sending mail - ', json);
        if(err) {
          return res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    }
  ], function (err) {
    if(err) { return next(err); }
    res.redirect('/forgotPassword');
  });
};

/**
 * Resets the password of the user
 *
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.resetPassword = function(req, res) {
  console.log(req.params);
  console.log(req.body);
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.sendStatus(404); }
    user.password = req.body.newPassword;
    user.resetPasswordToken = '';
    user.updatedOn = Date.now();
    user.save(function (err, user) {
      if(err) { return handleError(res, err); }

      var text_body = "Hello " + user.name + " " + user.secondName + ",\nGreetings from Shaastra-2016 team.\n\n" +
        "This is a confirmation that the password for your account " + user.email + " - " + user.festID + " has just been changed\n\n" +
        "Best,\nShaastra 2016 team";
      var html_body = "<table style=\"background-color: #f3f3f3; font-family: verdana, tahoma, sans-serif; color: black; padding: 30px;\">" +
        "<tr> <td>" +
        "<h2>Hello " + user.name + " " + user.secondName + ",</h2>" +
        "<p>Greetings from Shaastra-2016 team.</p>" +
        "<p>This is a confirmation that the password for your account <b>" + user.email + " - " + user.festID + "</b> has just been changed</p>" +
        "Best,<br/> Shaastra 2016 team</p> </td> </tr> </table>";
      var params = {
        to: user.email,
        from: 'support@shaastra.org',
        fromname: 'Shaastra WebOps',
        subject: 'Your Shaastra account password has been changed',
        replyto: 'chinni@shaastra.org',
        text: text_body,
        html: html_body
      };
      var email = new sendgrid.Email(params);
      sendgrid.send(email, function (err, json) {
        console.log('Error sending mail - ', err);
        console.log('Success sending mail - ', json);
        if(err) {
          return res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });

    });
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

exports.getCoords = function (req, res, next) {
  User.find({ role:'coord' }, 'name _id phoneNumber', function (err, result) {
    if (err) { return handleError(res, err); }
    return res.json(result);
  });
};
