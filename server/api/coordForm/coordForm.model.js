'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CoordFormSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	created_on: { type: Date },
	updated_on: { type: Date },
	department: { type: Schema.Types.ObjectId, ref: 'Department' },
	subDepartment: { type: Schema.Types.ObjectId, ref: 'SubDepartment' },
	position: {},
	allowUploads: { 
		type:Boolean,
		default: false
	},
	fileId: String,
	trackFormId: String,
	fields: []
});

module.exports = mongoose.model('CoordForm', CoordFormSchema);