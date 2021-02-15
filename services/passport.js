const passport = require("passport");
const User = require("../models/user");
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

//create local strategy
const localOptions = { usernameFiled: "email" };
const localLogin = new LocalStrategy(
  localOptions,
  function (email, password, done) {
    //Verify user name and password

    User.findOne({ email: email }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
    });
  }
);

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

    //compare user password
    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
});

//Tell passport to use this strategy

passport.use(jwtLogin);
passport.use(localLogin);
