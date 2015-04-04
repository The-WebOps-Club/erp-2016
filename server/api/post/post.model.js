'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: String,
  info: String,
  department: {},
  subDepartment: {},
  profile: Schema.Types.ObjectId,
  taggedTo: {},
  comments: {},
  createdBy: Schema.Types.ObjectId,
  seenBy: {},
  createdOn: {
  	type: Date,
  	default: Date.now
  },
  updatedOn: {
  	type: Date,
  	default: Date.now
  }
});

module.exports = mongoose.model('Post', PostSchema);