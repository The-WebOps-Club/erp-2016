'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaskSchema = new Schema({
  title: String,
  info: String,
  assignedToDepartments: {type:Schema.ObjectId,ref:'Department'},
  assignedToCoords: [{type:Schema.Types.ObjectId,ref:'User'}],
  reportTo: {type:Schema.ObjectId,ref:'User'},
  deadline: {
  	type: Date
  },
  status: Boolean,
  comments: {type:String},
  createdBy: {type:Schema.ObjectId,ref:'User'},
  createdOn: {
  	type: Date,
  	default: Date.now
  },
  updatedOn: {
  	type: Date,
  	deafult: Date.now
  }
});
module.exports = mongoose.model('Task', TaskSchema);
