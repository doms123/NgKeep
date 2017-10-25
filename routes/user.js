const express =  require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const passport = require('passport');


router.post('/register', (req, res) => {
    let newUser = new User.User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err) {
            res.json({success: false, msg: 'Failed to register new account'});
        }else {
            res.json({success: true, msg: 'Success to register new account'});
        }
    });
});

router.post('/login', (req, res) => {
    let email = req.body.email;
    let pass = req.body.password;

    User.checkUserByEmail(email, (err, user) => {
        if(err) throw err;
        
        if(!user) {
            return res.json({success: false, msg: 'Invalid email address'});
        }
        
        User.comparePassword(pass, user.password, (err, isMatch) => {
            if(err) throw err;

            if(isMatch) {
                const token = jwt.sign({data:user}, config.secret, {expiresIn: 604800});
                const userData = {
                    name: user.name,
                    email: user.email
                }
                res.json({
                    success: true,
                    token: 'JWT '+token,
                    user: userData
                });
            }else {
                res.json({success: false, msg: 'Wrong password'});
            }
        });
        
    });
});


router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

module.exports = router;