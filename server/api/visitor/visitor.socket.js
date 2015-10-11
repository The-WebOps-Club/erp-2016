/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Visitor = require('./visitor.model');

exports.register = function(socket) {
  Visitor.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Visitor.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('visitor:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('visitor:remove', doc);
}