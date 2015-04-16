'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CoordFormSchema = new Schema({
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
	form_department: { type: Schema.Types.ObjectId, ref: 'Department' },
	form_subDepartment: { type: Schema.Types.ObjectId, ref: 'SubDepartment' },
	form_position: [],
	form_fields: []
});

module.exports = mongoose.model('CoordForm', CoordFormSchema);