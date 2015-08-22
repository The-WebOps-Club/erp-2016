'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CheckinSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  room: { type: Schema.Types.ObjectId, ref: 'Room' },
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



