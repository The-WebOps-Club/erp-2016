'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CollegeSchema = new Schema({
  name: String,
  createdOn: { type: Date, default: Date.now(); }
});

module.exports = mongoose.model('College', CollegeSchema);