// moddules for node and express
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');
let passport = require('passport');
let passportJWT = require('passport-jwt');
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;
let passportLocal = require('passport-local');

// import "mongoose" - required for DB Access
let mongoose = require('mongoose');
// URI
let DB = require('./db');

mongoose.connect(process.env.URI || DB.URI, { useNewUrlParser: true, useUnifiedTopology: true });

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', () => {
  console.log("Connected to MongoDB...");
});

// define routers
let incidents = require('../routes/incidents');
let auth = require('../routes/auth');

let app = express();

// uncomment after placing your favicon in /client
app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(process.cwd() + "/ExpenseTrackerClient/dist/ExpenseTracker/"));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

let User = require('../models/user');
passport.use(User.createStrategy());
//serialize and deserialize the user info.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = DB.Secret;
let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
  User.findById(jwt_payload.id).then(user => {
    return done(null, user);
  }).catch(err => {
    return done(err, false);
  });
});
passport.use(strategy);

// route redirects
app.use('/api/incidents', incidents);
app.use('/api/auth', auth);

app.get('/*', (req, res) => {
  res.sendFile(process.cwd() + "/ExpenseTrackerClient/dist/ExpenseTracker/index.html")
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;
