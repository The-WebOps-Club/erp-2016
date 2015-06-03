'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventTabSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('EventTab', EventTabSchema);