'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var MilanSchema = new Schema({
	name: String,
	city: String,
	milanLocation: String,
	phoneNumber: String,
	emailId: String,
	members: [Schema.Types.Mixed]
	performances: [String]
});

module.exports = mongoose.model('Milan', MilanSchema);