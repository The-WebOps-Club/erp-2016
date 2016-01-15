'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TestSchema = new Schema({
  connection: Boolean,
  active: Boolean
});

module.exports = mongoose.model('Test', TestSchema);