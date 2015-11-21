'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FinancePortalSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('FinancePortal', FinancePortalSchema);