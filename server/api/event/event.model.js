'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
  name: String,
  info: String,
  venue: String,
  eventTabs: [{ type: Schema.Types.ObjectId, ref: 'EventTab' }],
  assignees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  eventCategory: [{ type: Schema.Types.ObjectId, ref: 'EventList' }],
  createdOn: Date,
  updatedOn: Date,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  lastUpdatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  acceptedByAdmin: { type: Boolean, default: false },
  eventDate: Date,
  startReg: Date,
  endReg: Date,
  requireTDP: Boolean
});

module.exports = mongoose.model('Event', EventSchema);