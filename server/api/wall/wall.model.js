'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WallSchema = new Schema({
  name: String,
  parentId: String,
});

module.exports = mongoose.model('Wall', WallSchema);