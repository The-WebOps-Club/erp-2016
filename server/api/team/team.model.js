'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TeamSchema = new Schema({
  name: String,
  accStatus: String,
  city: String,
  dateOfArrival: Date,
  dateOfDeparture: Date,
  romHistory: String
});

module.exports = mongoose.model('Team', TeamSchema);