'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CheckinSchema = new Schema({
  user: Schema.ObjectId,
  room: Schema.ObjectId,
  status: String,
  dateCheckIn: {
  	type: Date,
  	default: Date.now
  },
  dateCheckOut: {
  	type: Date
  }
});

module.exports = mongoose.model('Checkin', CheckinSchema);