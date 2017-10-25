const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('User', UserSchema);

const checkUserById = (id, callback) => {
    User.findById(id, callback);
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
        if(err) throw err;
        callback(null, isMatch);
    });
}

module.exports = {User, addUser, checkUserByEmail, comparePassword, checkUserById};