/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var EventList = require('./eventList.model');

exports.register = function(socket) {
  EventList.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  EventList.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('eventList:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('eventList:remove', doc);
}