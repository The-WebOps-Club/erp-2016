'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FormSchema = new Schema({
	form_id: String,
	form_name: {
		type: String,
		required: true
	},
	created_on: {
		type: Date,
		default: Date.now()
	},
	updated_on: {
		type: Date,
		default: Date.now()
	},
	form_department: [],
	form_subDepartment: [],
	form_position: [],
	form_fields: [],
	form_responses: []
});

module.exports = mongoose.model('Form', FormSchema);