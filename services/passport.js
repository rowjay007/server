const passport = require("passport");
const User = require("../models/user");
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const jwOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret,
};

const jwtLogin = new JwtStrategy(jwOptions, function (payload, done) {
  //See if the user ID and payload exists in our database
  User.findById(payload.sub, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

//Tell passport to use this strategy

passport.use(jwtLogin);
