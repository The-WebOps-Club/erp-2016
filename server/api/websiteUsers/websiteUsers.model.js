'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WebsiteUsersSchema = new Schema({
 
  name: String,
  // 1 for Male, 0 for female 
  gender: Boolean,
  dob: Date,
  age: Number,
  phoneNumber: String,

  branch: String,
  college: String,
  collegeRoll: String,
  //1 for school student, 0 for false
  schoolStudent: Boolean,
  city: String,

  wantAccomodation: Boolean,

  activationKey: String,
  keyExpires: Date,
  sendEmails: Boolean,

  dateCreated: { type: Date, default: Date.now },

  interestedFields: [{ type: Schema.Types.ObjectId, ref: 'Field' }] ,
  eventsApplied: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  selfTeam: { type: Schema.Types.ObjectId, ref: 'Team' },

  festID: String,

  hashedPassword: String,
  provider: String,
  salt: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

module.exports = mongoose.model('WebsiteUsers', WebsiteUsersSchema);