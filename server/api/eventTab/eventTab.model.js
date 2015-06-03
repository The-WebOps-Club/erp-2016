'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventTabSchema = new Schema({
  name: String,
  info: String,
  eventDetails: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  tabNumber: Number
});

module.exports = mongoose.model('EventTab', EventTabSchema);