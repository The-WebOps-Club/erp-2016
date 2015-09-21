'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FieldSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Field', FieldSchema);