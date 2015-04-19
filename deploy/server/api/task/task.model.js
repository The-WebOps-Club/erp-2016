'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaskSchema = new Schema({
  title: String,
  info: String,
  assignedToDepartments: {},
  assignedToCoords: {},
  reportTo: {},
  deadline: {
  	type: Date
  },
  status: Boolean,
  comments: {},
  createdBy: {},
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