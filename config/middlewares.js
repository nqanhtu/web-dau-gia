var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(expressValidator());

    app.use(express.static(path.resolve(__dirname, '../public')));
};