// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var database = require('../middlewares/db_helpers');
var mustache = require('mustache');

<<<<<<< HEAD
=======

>>>>>>> 9a27b571be32885d7cad2ab940bdcb75d1c16fac
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
<<<<<<< HEAD
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
                        'INSERT INTO `users` (`full_name`, `email`, `avatar`, `address`, `password`) VALUES ("{{full_name}}", "{{email}}", "{{avatar}}", "{{address}}", "{{password}}")',
                        newUser);

                    database.passportInsert(insertNewUserQuery, function (error, result) {
                        newUser['id'] = result.insertId;
                        return done(null, newUser);
                    });
                }
            });
        })
=======
            function (req, res, email, password, done) {

                let request = require('request');    // Sử dụng thư viện request để gửi request lên Google API
                let data = req.body;  // Dữ liệu từ form submit lên bao gồm thông tin đăng ký và captcha response
                let captchaResponse = data.captchaResponse;

                if (captchaResponse) {
                    request({
                        url: 'https://www.google.com/recaptcha/api/siteverify',
                        method: 'POST',
                        form: {
                            secret: '6LcWVScUAAAAAIaqzgtahZvqUClIxb-CD9GHNcim',
                            response: captchaResponse
                        }
                    }, function (error, response, body) {
                        // Parse String thành JSON object
                        try {
                            body = JSON.parse(body);
                        } catch (err) {
                            body = {};
                        }

                        if (!error && response.statusCode == 200 && body.success) {
                            // Captcha hợp lệ, xử lý tiếp phần đăng ký tài khoản    
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

                        } else {
                            // Xử lý lỗi nếu Captcha không hợp lệ
                        }
                    });
                } else {
                    // Xử lý lỗi nếu không có Captcha
                }




            })
>>>>>>> 9a27b571be32885d7cad2ab940bdcb75d1c16fac
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

<<<<<<< HEAD
                    return done(null, rows[0]);                    
=======
                    return done(null, rows[0]);
>>>>>>> 9a27b571be32885d7cad2ab940bdcb75d1c16fac
                });
            })
    );
};
