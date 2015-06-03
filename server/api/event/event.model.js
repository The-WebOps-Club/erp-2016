'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
  name: String,
  info: String,
  eventTabs: [{ type: Schema.Types.ObjectId, ref: 'EventTab' }],
  assignees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  eventCategory: [{ type: Schema.Types.ObjectId, ref: 'EventList' }]
});

module.exports = mongoose.model('Event', EventSchema);