'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
  eventId: { type: Schema.Types.ObjectId, ref: 'Event' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  coordId: { type: Schema.Types.ObjectId, ref: 'Team' },
  feedback: String
});

module.exports = mongoose.model('Feedback', FeedbackSchema);