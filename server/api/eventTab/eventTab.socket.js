/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var EventTab = require('./eventTab.model');

exports.register = function(socket) {
  EventTab.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  EventTab.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('eventTab:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('eventTab:remove', doc);
}