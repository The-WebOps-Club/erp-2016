/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Tdpform = require('./tdpform.model');

exports.register = function(socket) {
  Tdpform.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Tdpform.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('tdpform:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('tdpform:remove', doc);
}