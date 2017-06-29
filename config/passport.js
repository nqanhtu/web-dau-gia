// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var database = require('../middlewares/db_helpers');
var mustache = require('mustache');


module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        var query = 'SELECT * FROM users WHERE id = ' + id;
        database.passportSelect(query, function (error, rows) {
            done(error, rows[0]);
        });
    });

    passport.use(
        'local-register',
        new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
            function (req, email, password, done) {



                var query = 'SELECT * FROM users WHERE email = "' + email + '"';
                database.passportSelect(query, function (error, rows) {
                    if (error)
                        return done(error);
                    if (rows.length) {
                        return done(null, false, req.flash('registerMessage', 'That username is already taken.'));
                    } else {
                        var newUser = {
                            email: email,
                            full_name: req.body.fullName,
                            address: req.body.address,
                            avatar: req.body.avatar,
                            password: crypto.createHash('md5').update(password).digest('hex')
                        };
                        var insertNewUserQuery = mustache.render(
                            'INSERT INTO `users` (`full_name`, `email`, `avatar`, `address`, `password`) VALUES ("{{full_name}}", "{{email}}", "{{address}}", "{{avatar}}", "{{password}}")',
                            newUser);

                        database.passportInsert(insertNewUserQuery, function (error, result) {
                            newUser['id'] = result.insertId;
                            return done(null, newUser);
                        });
                    }
                });
            })
    );

    passport.use(
        'local-login',
        new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
            function (req, email, password, done) {
                var query = 'SELECT * FROM users WHERE email = "' + email + '"';
                database.passportSelect(query, function (error, rows) {
                    if (error)
                        return done(error);
                    if (!rows.length) {
                        return done(null, false, req.flash('loginMessage', 'That account doesnt exist. Enter a different account or get a new one.'));
                    }

                    var encryptedPassword = crypto.createHash('md5').update(req.body.password).digest('hex');

                    if (!(encryptedPassword === rows[0].password))
                        return done(null, false, req.flash('loginMessage', 'That password is incorrect. Try again.'));

                    return done(null, rows[0]);
                });
            })
    );
};
