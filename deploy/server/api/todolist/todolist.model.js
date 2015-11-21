'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TodolistSchema = new Schema({
  title: String,
  info: String,
  assignees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  deadline: {
  	type: Date
  },
  status: Boolean,
  createdBy: {},
  createdOn: {
  	type: Date,
  	default: Date.now
  },
  updatedOn: {
  	type: Date,
  	default: Date.now
  }
});

module.exports = mongoose.model('Todolist', TodolistSchema);