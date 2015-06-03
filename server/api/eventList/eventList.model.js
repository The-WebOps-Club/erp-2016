'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventListSchema = new Schema({
  name: String,
  info: String,
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }]
});

module.exports = mongoose.model('EventList', EventListSchema);