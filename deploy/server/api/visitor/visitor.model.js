'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VisitorSchema = new Schema({
  name: String,
  dateOfBirth: Date,
  college: String,
  gender: String,
  accomodation: Boolean,
  phoneNumber: { type: String, default: '' },
  email: { type: String, default: ''},
  branch: { type: String, default: ''},
  school: { type: Boolean, default: false},
  city: String,
  createdOn: { type: Date, default: Date.now },
  sendMails: { type: Boolean, default: true },
  provider: String,
  facebook: {},
  google: {},
  deviceId: [String]
});

module.exports = mongoose.model('Visitor', VisitorSchema);