const express =  require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const passport = require('passport');
const multer = require('multer');
const Note = require('../models/note');
const path = require('path');
const fs = require('fs');

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

router.post('/register', (req, res) => {
    let newUser = new User.User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        photo: "",
        cover_photo: ""
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
            if (err) throw err;

            if (isMatch) {
                User.checkUserIsActive(user.email, (err, data) => {
                    if (data == null) {
                        return res.json({ success: false, msg: 'User account was inactive' });
                    } else {
                        const token = jwt.sign({ data: user }, config.secret, { expiresIn: 604800 });
                        const userData = {
                            userid: user._id,
                            name: user.name,
                            email: user.email
                        }
                        res.json({
                            success: true,
                            token: 'JWT ' + token,
                            user: userData
                        });
                    }
                });

            } else {
                res.json({ success: false, msg: 'Wrong password' });
            }
        }); 
    });
});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

let fileFilter = function(req, file, cb) {
    const extension = path.extname(file.originalname);
    
    if(
        extension != '.txt' &&
        extension != '.png' &&
        extension != '.gif' &&
        extension != '.jpg' &&
        extension != '.xlsx' &&
        extension != '.xls' &&
        extension != '.txt' &&
        extension != '.doc' &&
        extension != '.docx' &&
        extension != '.pdf' &&
        extension != '.JPG'
    ) {
        req.fileValidationError = 'goes wrong on the mimetype';
        return cb(null, false, new Error('goes wrong on the mimetype'));
    }

    cb(null, true);
}

let storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        let datetimestamp = Date.now();
        let fileName = file.originalname.split('.')[0];
        cb(null, fileName + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});

let upload = multer({ //multer settings
    storage: storage,
    fileFilter: fileFilter
}).single('postFile');

router.post('/postNotes', (req, res) => {
    upload(req, res, (err) => {
        if(err) return err;
        if(req.fileValidationError) {
            res.json({ success: false, msg: 'You have uploaded an invalid file, Failed to add new post.' });
        }

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

router.post('/post-edit-notes/:post_id', (req, res) => {
    const body = {
        _id: req.params.post_id
    };

    Note.deleteNotes(body, (err, notes) => {
        upload(req, res, (err) => {
            if (err) return err;
            if (req.fileValidationError) {
                res.json({ success: false, msg: 'You have uploaded an invalid file, Failed to edit notes.' });
            }

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
                    res.json({ success: false, msg: 'Failed to edit new post' });
                } else {
                    res.json({ success: true, msg: 'Note was edited!' });
                }
            });
        });
    });
});

router.post('/post-edit-notes-nofile/:post_id', (req, res) => {
    const body = {
        _id: req.params.post_id
    };

    Note.deleteNotes(body, (err, notes) => {
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

router.post('/notes', (req, res) => {
    let payload = {
        user_id: req.body.user_id,
        pin: req.body.pin
    }
    Note.showNotes(payload, (err, notes) => {
        res.json(notes);
    });
});

router.post('/notes-pinned', (req, res) => {
    let payload = {
        user_id: req.body.user_id,
        pin: req.body.pin
    }
    Note.showNotesPinned(payload, (err, notes) => {
        res.json(notes);
    });
});


router.post('/pinned-notes', (req, res) => {
    let payload = {
        _id: req.body.post_id
    };

    Note.pinnedNotes(payload, (err, notes) => {
        if(err) {
            res.json({success: false, msg: 'Error! Unable to pinned your notes.'});
        }else {
            res.json({success: true, msg: 'Pinned'});
        }
    });
});

router.post('/unpinned-notes', (req, res) => {
    let payload = {
        _id: req.body.post_id
    };

    Note.unpinnedNotes(payload, (err, notes) => {
        if(err) {
            res.json({success: false, msg: 'Error! Unable to unpinned your notes.'});
        }else {
            res.json({success: true, msg: 'Unpinned'});
        }
    });
});

router.post('/delete-notes', (req, res) => {
    let payload = {
        _id: req.body._id.post_id
    };

    Note.deleteNotes(payload, (err, notes) => {
        if(err) {
            res.json({success: false, msg: "Error! Unable to delete your notes"});
        }else {
            res.json({success: true, msg: "Notes was deleted"});
        }
    })
});

router.post('/save-profile', (req, res) => {
    let payload = req.body;

    User.saveProfile(payload, (err, data) => {
        if(err) {
            res.json({success: false, msg: "Unable to save profile data"});
        }else {
            res.json({ success: true, msg: "Profile data was saved" });
        }
    });
});

router.post('/user-logdata', (req, res) => {
    let payload = req.body;
    User.userLogData(payload, (err, data) => {
        if(err) {
            res.json({ success: false, msg: "Unable to get user data" });
        }else {
            res.json({ success: false, msg: "User data was retrieved", data: data});
        }
    });
});


let imageFilter = function (req, file, cb) {
    const extension = path.extname(file.originalname);

    if (
        extension != '.png' &&
        extension != '.gif' &&
        extension != '.jpg' &&
        extension != '.JPG'
    ) {
        req.fileValidationError = 'goes wrong on the mimetype';
        return cb(null, false, new Error('goes wrong on the mimetype'));
    }

    cb(null, true);
}

let imageStorage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        let datetimestamp = Date.now();
        let fileName = file.originalname.split('.')[0];
        cb(null, fileName + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});

let upload1 = multer({ //multer settings
    storage: imageStorage,
    fileFilter: imageFilter
}).single('profileImage');

router.post('/profilepic-change', (req, res) => {
    upload1(req, res, (err) => {
        if (err) return err;
        if (req.fileValidationError) {
            res.json({ success: false, msg: 'You have uploaded an invalid file, Failed update profile photo.' });
        }

        let payload = {
            _id: req.body.user_id,
            photo: res.req.file.filename
        };

        User.profilePicChange(payload, (err, data) => {
            if (err) {
                res.json({ success: false, msg: "Failed to change your profile picture" });
            } else {
                res.json({ success: false, msg: "Profile picture was changed", photo: res.req.file.filename });
            }
        });
    });
});

router.post('/coverphoto-change', (req, res) => {
    upload1(req, res, (err) => {
        if (err) return err;
        if (req.fileValidationError) {
            res.json({ success: false, msg: 'You have uploaded an invalid file, Failed update profile photo.' });
        }

        let payload = {
            _id: req.body.user_id,
            cover_photo: res.req.file.filename
        };

        User.coverPhotoChange(payload, (err, data) => {
            if (err) {
                res.json({ success: false, msg: "Failed to change your cover photo" });
            } else {
                res.json({ success: false, msg: "Cover photo was changed", photo: res.req.file.filename });
            }
        });
    });
});

router.post('/register-email-verification', (req, res) => {
    let payload = req.body;
    User.registerEmailVerification(payload).then(data => {
        if(data.status == 0) {
            res.json({success: false, msg: data.msg});
        }else {
            res.json({success: true, msg: data.msg});
        }
    });
});

router.get('/google-login', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google-redirect', passport.authenticate('google'), (req, res) => {
    let userid = encodeURIComponent(req.user._id);
    res.redirect('http://localhost:4200/home/'+userid);
});

router.get('/facebook-login', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook-redirect', passport.authenticate('facebook'), (req, res) => {
    let userid = encodeURIComponent(req.user._id);
    res.redirect('http://localhost:4200/home');
});

module.exports = router;
