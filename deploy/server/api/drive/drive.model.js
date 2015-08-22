'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DriveSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Drive', DriveSchema);