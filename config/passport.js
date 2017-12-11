const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('./database');
const User = require('../models/user');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = (passport) => {
    const opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
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

    passport.use(
        new GoogleStrategy({
            clientID: '750205901997-dg958ihcvmrb4hdbrcakcm53np4aqla9.apps.googleusercontent.com',
            clientSecret: 'dJpg9iifs9YKMcQWWLHVZmQr',
            callbackURL: "http://localhost:3000/api/google-redirect"
        },
        (accessToken, refreshToken, profile, cb) => {
            let data = {
                name: profile.displayName,
                email: profile.emails[0].value,
                is_active: true,
                about: '',
                phone: '',
                address: '',
                website: '',
                photo: '',
                cover_photo: ''
            }

            User.checkUserByEmail(profile.emails[0].value, (err, res) => {
                if(res == null) {
                    User.saveUser(data, (err, userdata) => {
                        return cb(null, userdata);
                    });
                }else {
                    return cb(null, res);
                }
            });
        })
    );

    passport.use(
        new FacebookStrategy({
            clientID: '300560190433203',
            clientSecret: 'e4060213ec0aa82292068e9549d38cff',
            callbackURL: "http://localhost:3000/api/facebook-redirect",
            profileFields: ['id', 'emails', 'name'] 
        },
        (accessToken, refreshToken, profile, cb) => {
            //profile.emails[0].value;
            let data = {
                name: profile.name.givenName +' '+profile.name.familyName,
                email: profile.emails[0].value,
                is_active: true,
                about: '',
                phone: '',
                address: '',
                website: '',
                photo: '',
                cover_photo: ''
            }

            
            User.checkUserByEmail(profile.emails[0].value, (err, res) => {
                if(res == null) {
                    User.saveUser(data, (err, userdata) => {
                        return cb(null, userdata);
                    });
                }else {
                    return cb(null, res);
                }
            });
        })
    );
}

