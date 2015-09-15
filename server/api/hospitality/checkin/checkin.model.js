'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var autopopulate= require('mongoose-autopopulate');

var CheckinSchema = new Schema({
  visitor: { type: Schema.Types.ObjectId, ref: 'Visitor' },
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
CheckinSchema.plugin(autopopulate);
module.exports = mongoose.model('Checkin', CheckinSchema);