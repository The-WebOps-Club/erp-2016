'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ResponseSchema = new Schema({
	form: { type: Schema.Types.ObjectId, ref: 'CoordForm' },
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	valid: Boolean,
	fields: [],
	createdOn: {
		type: Date,
		default: Date.now()
	},
	updatedOn: {
		type: Date,
		default: Date.now()
	},
	comments: String
});

module.exports = mongoose.model('Response', ResponseSchema);