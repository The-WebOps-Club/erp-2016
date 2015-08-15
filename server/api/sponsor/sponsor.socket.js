/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Sponsor = require('./sponsor.model');

exports.register = function(socket) {
  Sponsor.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Sponsor.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('sponsor:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('sponsor:remove', doc);
}