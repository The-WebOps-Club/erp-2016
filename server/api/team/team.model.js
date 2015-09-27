'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TeamSchema = new Schema({
  teamMembers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  eventsRegistered: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  teamName: String,
  teamLeader: { type: Schema.Types.ObjectId, ref: 'User' },
  selfTeam: { type: Boolean, default: false },
  selectedEvents: [{ type: Schema.Types.ObjectId, ref: 'Event' }]
});

module.exports = mongoose.model('Team', TeamSchema);