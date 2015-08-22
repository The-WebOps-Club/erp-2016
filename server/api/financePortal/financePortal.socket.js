/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var FinancePortal = require('./financePortal.model');

exports.register = function(socket) {
  FinancePortal.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  FinancePortal.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('financePortal:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('financePortal:remove', doc);
}