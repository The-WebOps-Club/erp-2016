/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Milan = require('./milan.model');

exports.register = function(socket) {
  Milan.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Milan.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('milan:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('milan:remove', doc);
}