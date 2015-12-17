'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
  name: String,
  info: String,
  venue: String,
  eventTabs: [{ type: Schema.Types.ObjectId, ref: 'EventTab' }],
  core: { type: Schema.Types.ObjectId, ref: 'User' },
  assignees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  eventCategory: [{ type: Schema.Types.ObjectId, ref: 'EventList' }],
  createdOn: Date,
  updatedOn: Date,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  lastUpdatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  acceptedByAdmin: { type: Boolean, default: false },
  isEvent: { type: Boolean, default: true },
  isWorkshop: { type: Boolean, default: false },
  eventDate: Date,
  startReg: Date,
  endReg: Date,
  requireTDP: { type: Boolean, default: false },
  shaastraFellowship: { type: Boolean, default: false },
  paidEvent: { type: Boolean, default: false },
  maxTeamMembers: { type: Number, default: 1 },
  minTeamMembers: { type: Number, default: 1 },
  registrations: [{ type: Schema.Types.ObjectId, ref: 'Registration' }],
  imageid: String,
  imagename: String,
  points: [{ type: Number }],
  winners: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  selectedTeams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  tdpForm: { type: Schema.Types.ObjectId, ref: 'Tdpform' },
  marqueeNotifs: [{ type: Schema.Types.ObjectId, ref: 'MarqueeNotif' }]
  // sponsoredBy: [{ type: Schema.Types.ObjectId, ref: 'SponsoredBy' }]
  // TODO: tdpForm: { type: Schema.Types.ObjectId, ref: 'Tdp' }
});

module.exports = mongoose.model('Event', EventSchema);