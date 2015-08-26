'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RegistrationSchema = new Schema({
	eventRegistered: { type: Schema.Types.ObjectId, ref: 'Event' },
	team: { type: Schema.Types.ObjectId, ref: 'Team' },
	registrationTime: Date
});

module.exports = mongoose.model('Registration', RegistrationSchema);