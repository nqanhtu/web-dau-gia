var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var cookieParser = require('cookie-parser');



module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    //app.use(cookieParser());


    // Express Session
    app.use(session({
        secret: 'secret2',
        saveUninitialized: true,
        resave: true
    }));
    // Passport init
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(path.resolve(__dirname, '../public')));
};