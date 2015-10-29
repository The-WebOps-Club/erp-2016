'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RegistrationSchema = new Schema({
	eventRegistered: { type: Schema.Types.ObjectId, ref: 'Event' },
	team: { type: Schema.Types.ObjectId, ref: 'Team' },
	registrationTime: Date,
	isSelected: { type: Boolean, default: false },
	fileID: String,
	fileName: String
});

module.exports = mongoose.model('Registration', RegistrationSchema);