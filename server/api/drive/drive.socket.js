/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Drive = require('./drive.model');

exports.register = function(socket) {
  Drive.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Drive.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('drive:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('drive:remove', doc);
}