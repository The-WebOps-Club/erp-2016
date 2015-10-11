'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TeamSchema = new Schema({
  name: String,
  accStatus: String,
  city: String,
  dateOfArrival: Date,
  dateOfDeparture: Date,
  roomHistory: String,
  checkin: Date,
  checkout: Date,
  mobile: String,
  number: Number,
  male: Number,
  female: Number,
  teamId: String
});

module.exports = mongoose.model('Team', TeamSchema);