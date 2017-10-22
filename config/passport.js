const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('./database');
const User = require('../models/user');

module.exports = (passport) => {
    const opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;

    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.checkUserById(jwt_payload.data._id, (err, user) => {
            if(err) {
                return done(err, false);
            }
            if(user) {
                return done(null, user);
            }else {
                return done(null, false);
            }
        });
    }));
}