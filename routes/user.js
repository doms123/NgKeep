const express =  require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const passport = require('passport');
const multer = require('multer');
const Note = require('../models/note');

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
                    userid: user._id,
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

let storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        let datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});

let upload = multer({ //multer settings
    storage: storage
}).single('postFile');

router.post('/postNotes', (req, res) => {
    upload(req, res, (err) => {
        if(err) return err;
        let newPost = new Note.Note({
            title: req.body.postTitle,
            note: req.body.postText,
            pin: req.body.postPin,
            file: res.req.file.filename,
            user_id: req.body.user_id,
            post_date: req.body.post_date
        });

        Note.addNote(newPost, (err, note) => {
            if (err) {
                res.json({ success: false, msg: 'Failed to add new post' });
            } else {
                res.json({ success: true, msg: 'New note was added!' });
            }
        });
    });
});

router.post('/postNotesWithoutFile', (req, res) => {
    let newPost = new Note.Note({
        title: req.body.title,
        note: req.body.note,
        pin: req.body.pin,
        file: req.body.file,
        user_id: req.body.user_id,
        post_date: req.body.post_date
    });

    Note.addNote(newPost, (err, note) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add new post' });
        } else {
            res.json({ success: true, msg: 'New note was added!' });
        }
    });
});

router.get('/notes', (req, res) => {
    Note.showNotes((err, notes) => {
        res.json(notes);
    });
});

module.exports = router;