'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  info: String,
  createdOn: {
  	type: Date,
  	default: Date.now
  },
  updatedOn: {
  	type: Date,
  	default: Date.now
  }
});

module.exports = mongoose.model('Comment', CommentSchema);