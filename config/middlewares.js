var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    // Passport init
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(path.resolve(__dirname, '../public')));
};