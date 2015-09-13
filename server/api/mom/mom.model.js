'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MomSchema = new Schema({
	title: String,
	date: {type: Date},
	attendedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	agenda: [String],
	updates: [String],
	planOfAction:[String],
	pointsDiscussed: [String]

});

//Validations

//Validating Empty attendedBY

MomSchema
  .path('attendedBy')
  .validate(function(attendedBy) {
    return attendedBy.length;
  }, 'Attended By cannot be an empty array');

//Validating Empty agenda
MomSchema
  .path('agenda')
  .validate(function(agenda) {
    return agenda.length;
  }, 'Agenda cannot be an empty array');

//Validating empty updates
MomSchema
  .path('updates')
  .validate(function(updates) {
    return updates.length;
  }, 'Updtaes cannot be an empty array');

//Validating empty planOfAction
MomSchema
  .path('planOfAction')
  .validate(function(planOfAction) {
    return planOfAction.length;
  }, 'Plan Of Action cannot be an empty array');

//Validating empty pointsDiscussed
MomSchema
  .path('pointsDiscussed')
  .validate(function(pointsDiscussed) {
	    return pointsDiscussed.length;
  }, 'Points Disscused  cannot be an empty array');

//validtaing Title
MomSchema
  .path('pointsDiscussed')
  .validate(function(pointsDiscussed) {
	    return pointsDiscussed.length;
  }, 'title  cannot be  blank');

module.exports = mongoose.model('Mom', MomSchema);