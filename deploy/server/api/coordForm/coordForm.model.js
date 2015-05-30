'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CoordFormSchema = new Schema({
	name: {
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
	department: { type: Schema.Types.ObjectId, ref: 'Department' },
	subDepartment: { type: Schema.Types.ObjectId, ref: 'SubDepartment' },
	position: {},
	allowUploads: { 
		type:Boolean,
		default: false
	},
	fields: []
});

module.exports = mongoose.model('CoordForm', CoordFormSchema);