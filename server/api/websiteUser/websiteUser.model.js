'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var authTypes = ['github', 'twitter', 'facebook', 'google'];

var WebsiteUsersSchema = new Schema({
 
  name: String,

  // 1 for Male, 0 for female 
  gender: Boolean,
  
  email: String,
  
  // dob: Date,
  age: Number,
  phoneNumber: String,

  branch: String,
  college: String,
  collegeRoll: String,
  
  //1 for school student, 0 for false
  schoolStudent: Boolean,
  city: String,

  wantAccomodation: Boolean,

  emailVerified: { type: Boolean, default: false },

  activationKey: String,
  keyExpires: Date,
  sendEmails: { type: Boolean, default: true },

  dateCreated: { type: Date, default: Date.now },

  role: {
    type: String,
    default: 'user'
  },

  interestedFields: [{ type: Schema.Types.ObjectId, ref: 'Field' }] ,
  eventsApplied: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  selfTeam: { type: Schema.Types.ObjectId, ref: 'Team' },

  festID: String,

  hashedPassword: String,
  provider: String,
  salt: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

/**
 * Virtuals
 */
WebsiteUsersSchema
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
WebsiteUsersSchema
  .virtual('profile')
  .get(function() {
    return {
      'name': this.name,
      'role': this.role
    };
  });

// Non-sensitive info we'll be putting in the token
WebsiteUsersSchema
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
WebsiteUsersSchema
  .path('name')
  .validate(function(name) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return name.length;
  }, 'Name cannot be blank');

// Validate empty city
WebsiteUsersSchema
  .path('city')
  .validate(function(city) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return city.length;
  }, 'City cannot be blank');

// // Validate empty summerLocation
// WebsiteUsersSchema
//   .path('summerLocation')
//   .validate(function(summerLocation) {
//     if (authTypes.indexOf(this.provider) !== -1) return true;
//     return summerLocation.length;
//   }, 'Summer Location cannot be blank');

// Validate phoneNumber
WebsiteUsersSchema
  .path('phoneNumber')
  .validate(function(phoneNumber) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    var regExpPhone = /^\d{10}$/;
    return (regExpPhone.test(phoneNumber));
  }, 'Phone Number must have 10 digits');

// // Validate collegeRoll
// WebsiteUsersSchema
//   .path('collegeRoll')
//   .validate(function(collegeRoll) {
//     if (authTypes.indexOf(this.provider) !== -1) return true;
//     return (collegeRoll.length != 0);
//   }, 'Roll Number cannot be empty');

// Validate empty email
WebsiteUsersSchema
  .path('email')
  .validate(function(email) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return email.length;
  }, 'Email cannot be blank');

// Validate empty password
WebsiteUsersSchema
  .path('hashedPassword')
  .validate(function(hashedPassword) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
  }, 'Password cannot be blank');

// Validate email is not taken
WebsiteUsersSchema
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
WebsiteUsersSchema
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
WebsiteUsersSchema.methods = {
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

module.exports = mongoose.model('WebsiteUsers', WebsiteUsersSchema);