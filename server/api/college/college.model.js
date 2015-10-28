'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CollegeSchema = new Schema({
  collegeName: String,
  createdOn: { type: Date, default: Date.now(); }
});

module.exports = mongoose.model('College', CollegeSchema);