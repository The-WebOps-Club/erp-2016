'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PlaceSchema = new Schema({
  name: String,
  info: String,
  latitude: Number,
  longitude: Number
});

module.exports = mongoose.model('Place', PlaceSchema);