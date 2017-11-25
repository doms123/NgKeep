const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');
const passport = require('passport');
const app = express();
const port = 3000;

// Connect to mongo using mongoose
mongoose.connect(config.database);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to mongoDB');
});

// Use cors middleware
app.use(cors());

// Use body-parser middleware
app.use(bodyParser.json());

//create a cors middleware
app.use(function(req, res, next) {
//set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Use passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/api', require('./routes/user'));

// Load a static file
app.use(express.static('public'));

// Create a server listening to port 3000
app.listen(port, () => {
    console.log(`App listening to port ${port}`);
});


