const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    is_active: Boolean,
    about: String,
    phone: String,
    address: String,
    website: String,
    photo: String,
    cover_photo: String
});

const User = mongoose.model('User', UserSchema);

const checkUserById = (id, callback) => {
    User.findById(id, callback);
};

const checkUserIsActive = (email, callback) => {
    let query = { email: email, is_active: false };
    User.findOne(query, callback);
};

const addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

const checkUserByEmail = (email, callback) => {
    let query = {email: email};
    User.findOne(query, callback);
};

const comparePassword = (candidatePass, hash, callback) => {
    bcrypt.compare(candidatePass, hash, (err, isMatch) => {
        callback(null, isMatch);
    });
};

const saveProfile = (payload, callback) => {
    let userid = payload._id;
    let about = payload.about;
    let phone = payload.phone;
    let address = payload.address;
    let email = payload.email;
    let name = payload.name;
    let website = payload.website;

    User.update({ _id: userid }, { $set: { about: about, phone: phone, address: address, email: email, name: name, website: website } }, { upsert: true}, callback);
}

const userLogData = (payload, callback) => {
    User.find(payload).select('-password').exec(callback); // exclude password field
};

const profilePicChange = (payload, callback) => {
    let userid = payload._id;
    let photo = payload.photo;
    User.update({ _id: userid }, { $set: {photo: photo}}, callback)
}

const coverPhotoChange = (payload, callback) => {
    let userid = payload._id;
    let cover_photo = payload.cover_photo;
    User.update({ _id: userid }, { $set: { cover_photo: cover_photo } }, callback)
}

const registerEmailVerification = (payload) => {
    let email = payload.email;

    let promise = new Promise((resolve, reject) => {
        // Check if email already exist
        let query = {email: email};
        User.findOne(query, (err, data) => {
            if(err) throw err;
            if(data == null) {
                // Send an email
                
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(email, salt, function(err, hash) {
                        let transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user:'dominicksanchez30@gmail.com',
                                pass: 'jennicadoms123'
                            }
                        });
                    
                        let mailOptions = {
                            from: 'dominicksanchez30@gmail.com',
                            to: email,
                            subject: 'NG KEEP sign up account email verification',
                            html: `
                                <p>You are now one step to finish the registration for NG KEEP account, kindly click the link to proceed. <a href="http://localhost:4200/confirm-register/${hash}">http://localhost:4200/confirm-register/${hash}</a></p>
                                <br></br>
                                <p>Best regards, NG KEEP Team</p>
                            `
                        };
                    
                        transporter.sendMail(mailOptions, (err, info) => {
                            if(err) {
                            }else {
                                resolve({
                                    status: 1,
                                    msg: 'Email verification was sent to your email'
                                });
                                // Save record
                                bcrypt.genSalt(10, (err, salt) => {
                                    bcrypt.hash(payload.password, salt, (err, hash) => {
                                        if(err) throw err;
                                        payload.password = hash;
                                        let user = new User(payload);
                                        user.save();
                                        resolve({
                                            status: 1,
                                            msg: 'Email verification was sent to your email'
                                        });
                                    });
                                });  
                            }
                        });
                    });
                });
            }else {
                resolve({
                    status: 0,
                    msg: 'Email address was already exist'
                });
            }
        });
    });

    return promise;
}

const saveUser = (payload, callback) => {
    newUser = new User(payload);

    newUser.save(callback);
}

module.exports = { User, addUser, checkUserByEmail, comparePassword, checkUserById, saveProfile, userLogData, profilePicChange, coverPhotoChange, registerEmailVerification, checkUserIsActive, saveUser };