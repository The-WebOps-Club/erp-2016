'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var authTypes = ['github', 'twitter', 'facebook', 'google'];
<<<<<<< HEAD
=======
var hostels = ['Alakananda',
               'Bhadra',
               'Brahmaputra',
               'Cauvery',
               'Ganga',
               'Godavari',
               'Jamuna',
               'Krishna',
               'Mahanadhi',
               'Mandakini',
               'Narmada',
               'Pampa',
               'Saraswathi',
               'Sabarmati',
               'Sarayu',
               'Sharavati',
               'Sindhu',
               'Sarayu Extension',
               'Tamraparani',
               'Tapti',
               'Tunga',
               'Day Scholar'
               ];
>>>>>>> master

var UserSchema = new Schema({
  name: { type: String, default: '' },
  nick: String,
<<<<<<< HEAD
  rollNumber: { type: String, default: ' ' },
=======
  profilePic: String,
  rollNumber: { type: String, default: '' },
  hostel: {type: String, enum: hostels},
  roomNumber: { type: String, default: '' },
>>>>>>> master
  email: { type: String, lowercase: true, default: '' },
  role: {
    type: String,
    default: 'user'
  },
  isActive: {},
  city: { type: String, default: '' },
  summerLocation: { type: String, default: '' },
  cgpa: { type: Number, default: '' },
<<<<<<< HEAD
  lastSeen: {
    type: Date
  },
  phoneNumber: { type: String, default: '' },
  formApplied: [],
  department: [{ type: Schema.Types.ObjectId, ref: 'Department' }],
  subDepartment: [{ type: Schema.Types.ObjectId, ref: 'SubDepartment' }],
  hashedPassword: String,
  provider: String,
  salt: String,
=======
  lastSeen: { type: Date },
  phoneNumber: { type: String, default: '' },
  alternateNumber: { type: String, default: '' },
  wall: {type: Schema.Types.ObjectId, ref: 'Wall'},
  department: [{ type: Schema.Types.ObjectId, ref: 'Department' }],
  subDepartment: [{ type: Schema.Types.ObjectId, ref: 'SubDepartment' }],
  groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
  deviceId: [String], //Mobile ID for GCM push notifs
  hashedPassword: String,
  provider: String,
  salt: String,
  updatedOn: { type: Date },
  createdOn: { type: Date },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
>>>>>>> master
  facebook: {},
  google: {},
  github: {}
});

/**
 * Virtuals
 */
UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// Public profile information
UserSchema
  .virtual('profile')
  .get(function() {
    return {
      'name': this.name,
      'role': this.role
    };
  });

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id,
      'role': this.role
    };
  });

/**
 * Validations
 */

// Validate empty name
UserSchema
  .path('name')
  .validate(function(name) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return name.length;
  }, 'Name cannot be blank');

// Validate empty city
UserSchema
  .path('city')
  .validate(function(city) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return city.length;
  }, 'City cannot be blank');

<<<<<<< HEAD
=======
// Validate hostel
// WARNING - validating only the value name can be corrupted. There is a bug
// UserSchema
//   .path('hostel')
//   .validate(function(hostel) {
//     if (authTypes.indexOf(this.provider) !== -1) return true;
//     return (allHostels.indexOf(hostel.value) !== -1);
//   }, 'This is not a valid hostel');

// Validate empty roomNumber
// UserSchema
//   .path('roomNumber')
//   .validate(function(roomNumber) {
//     var regExpRoom = /\d+/;
//     if (authTypes.indexOf(this.provider) !== -1) return true;
//     return (regExpRoom.test(roomNumber));
//   }, 'Room Number cannot be blank');

>>>>>>> master
// Validate empty summerLocation
UserSchema
  .path('summerLocation')
  .validate(function(summerLocation) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return summerLocation.length;
  }, 'Summer Location cannot be blank');

// Validate cgpa
UserSchema
  .path('cgpa')
  .validate(function(cgpa) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    var regExpCgpa = /^(10|\d)(\.\d{1,2})?$/;
    return (regExpCgpa.test(cgpa));
  }, 'CGPA cannot be blank');

// Validate phoneNumber
UserSchema
  .path('phoneNumber')
  .validate(function(phoneNumber) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    var regExpPhone = /^\d{10}$/; 
    return (regExpPhone.test(phoneNumber));
  }, 'Phone Number must have 10 digits');

<<<<<<< HEAD
=======
// //Validate Alternate Phone Number
// UserSchema
//   .path('alternateNumber')
//   .validate(function(alternateNumber) {
//     if (authTypes.indexOf(this.provider) !== -1) return true;
//     var regExpPhone = /^\d{10}$/; 
//     return (regExpPhone.test(alternateNumber));
//   }, 'Phone Number must have 10 digits');

>>>>>>> master
// Validate rollNumber
UserSchema
  .path('rollNumber')
  .validate(function(rollNumber) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return (rollNumber.length == 8);
  }, 'Roll Number must be of 8 characters');

// Validate empty email
UserSchema
  .path('email')
  .validate(function(email) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return email.length;
  }, 'Email cannot be blank');

// Validate empty password
UserSchema
  .path('hashedPassword')
  .validate(function(hashedPassword) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
  }, 'Password cannot be blank');

// Validate email is not taken
UserSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({email: value}, function(err, user) {
      if(err) throw err;
      if(user) {
        if(self.id === user.id) return respond(true);
        return respond(false);
      }
      respond(true);
      console.log(value);
    });
}, 'The specified email address is already in use.');

var validatePresenceOf = function(value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function(next) {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1)
      next(new Error('Invalid password'));
    else
      next();
  });

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

module.exports = mongoose.model('User', UserSchema);
