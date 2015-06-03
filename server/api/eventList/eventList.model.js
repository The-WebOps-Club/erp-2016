'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventListSchema = new Schema({
  name: String,
  info: String,
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  createdOn: Date,
  updatedOn: Date,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  lastUpdatedBy: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('EventList', EventListSchema);