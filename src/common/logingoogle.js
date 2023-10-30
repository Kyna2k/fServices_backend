const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GOOGLE_CLIENT_ID =
  "1083679158518-hujukb7dd3hvpcj4ro6l1hr5nhqtekgk.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const passport = require("passport");
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {

  done(null, user);
});
const value = passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/login/with-google-callback",
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
module.exports = value;
