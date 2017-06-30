var controllers = require('../controllers/index');
var bodyParser = require('body-parser');
var request = require('request');

module.exports = function (app, passport) {
    // Home page
    app.get('/', controllers.home.index);
    app.get('/all-products', controllers.home.allProducts);
    app.get('/others', controllers.home.others);
    app.get('/technology', controllers.home.technology);
    app.get('/fashion', controllers.home.fashion);
    app.get('/houseware', controllers.home.houseware);

    // User page

    app.get('/user/logout', controllers.user.logout);
    app.get('/user/profile', controllers.user.isLoggedIn, controllers.user.profile);
    app.post('/user/profile', controllers.user.isLoggedIn, controllers.user.updateInformation);

    app.get('/user/change-password', controllers.user.isLoggedIn, controllers.user.changePassword);
    app.post('/user/change-password', controllers.user.isLoggedIn, controllers.user.updatePassword);

    app.get('/user/products-auctioned', controllers.user.isLoggedIn, controllers.user.LoadProductsAuctioned);

    app.get('/user/products-auctioning', controllers.user.isLoggedIn, controllers.user.LoadProductsAuctioning);

    app.get('/user/products-follows', controllers.user.isLoggedIn, controllers.user.LoadProductsFollows);

    app.get('/user/register', controllers.user.register);
    app.post('/user/register', function (req, res) {
        // //reCapCha
        // if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        //     return res.json({ "responseCode": 1, "responseDesc": "Please select captcha" });
        // }
        // // Put your secret key here.
        // var secretKey = "6LcWVScUAAAAAIaqzgtahZvqUClIxb-CD9GHNcim";
        // // req.connection.remoteAddress will provide IP address of connected user.
        // var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
        // // Hitting GET request to the URL, Google will respond with success or error scenario.
        // request(verificationUrl, function (error, response, body) {
        //     body = JSON.parse(body);
        //     // Success will be true or false depending upon captcha validation.
        //     if (body.success !== undefined && !body.success) {
        //         return res.json({ "responseCode": 1, "responseDesc": "Failed captcha verification" });
        //     }
        //     res.json({ "responseCode": 0, "responseDesc": "Sucess" });
        // });
        reCAPTCHA = require('recaptcha2')

        recaptcha = new reCAPTCHA({
            siteKey: '6LcWVScUAAAAACTYNXpIc3xhTJQd63wE2W3A4vuV',
            secretKey: '6LcWVScUAAAAAIaqzgtahZvqUClIxb-CD9GHNcim'
        })
        recaptcha.validateRequest(req)
            .then(function () {
                // validated and secure
                res.json({ formSubmit: true })
            })
            .catch(function (errorCodes) {
                // invalid
                res.json({ formSubmit: false, errors: recaptcha.translateErrors(errorCodes) });// translate error codes to human readable text
            });

    }, passport.authenticate('local-register', {
        successRedirect: '/user/profile',
        failureRedirect: '/user/register',
        failureFlash: true
    }));

    app.get('/user/login', controllers.user.login);
    app.post('/user/login', passport.authenticate('local-login', {
        successRedirect: '/user/profile',
        failureRedirect: '/user/login',
        failureFlash: true
    }),
        function (req, res) {
            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
            res.redirect('/');
        });

    app.get('/product/detail/:id', controllers.product.detail);


};

function redirect(user) {
    if (user.type === -1) {
        return '/admin/profile'
    }
    return '/user/profile'
};