var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, 'client/assets/images');
  },
  filename: function (req, file, cb) {
    var ext = file.mimetype.split('/')[1];
    return cb(null, file.fieldname + '-' + Date.now() + "." + ext);
  }
})

exports.storage = storage;

