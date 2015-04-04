/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Post = require('./post.model');

exports.register = function(socket) {
  Post.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Post.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  Post.populate(doc, {path: 'title', select: 'info'}, function(err, post) {
    socket.emit('post:save', doc);
  });
}

function onRemove(socket, doc, cb) {
  socket.emit('post:remove', doc);
}