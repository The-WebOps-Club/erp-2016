'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var MilanSchema = new Schema({
	name: String,
	city: String,
	milanLocation: String,
	genre: String,
	emailId: String,

	members: [{
		name: String,
		emailId: String,
		phoneNumber: String
	}],
	performances: [String]

});

module.exports = mongoose.model('Milan', MilanSchema);
