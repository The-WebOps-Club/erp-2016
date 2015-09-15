'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SponsorSchema = new Schema({
  title: String,
  sponsor_link: String,
  logo: String,
  priority: Number,
  row_layout: Number,
  active: Boolean
  // need uploaded_by?timestamp?
});

module.exports = mongoose.model('Sponsor', SponsorSchema);
