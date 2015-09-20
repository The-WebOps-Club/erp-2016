/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Field = require('./field.model');

exports.register = function(socket) {
  Field.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Field.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('field:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('field:remove', doc);
}