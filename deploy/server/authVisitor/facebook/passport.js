var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

exports.setup = function (Visitor, config) {
  passport.use(new FacebookStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      Visitor.findOne({
        'facebook.id': profile.id
      },
      function(err, visitor) {
        if (err) {
          return done(err);
        }
        if (!visitor) {
          console.log('new visitor');
          visitor = new Visitor({
            name: profile.displayName,
            email: profile.emails[0].value,
            provider: 'facebook',
            facebook: profile._json
          });
          visitor.save(function(err) {
            if (err) done(err);
            return done(err, visitor);
          });
        } else {
          return done(err, visitor);
        }
      })
    }
  ));
};