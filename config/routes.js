var express = require('express');
var router = express.Router();
var controllers = require('../app/controllers');
var auth = require('./auth')




router.get('/', controllers.home.index);
router.get('/information',auth.isAuthenticated, controllers.information.information);
router.get('/shipping_address', controllers.information.shipping_address);
router.get('/list_products_auctioned', controllers.information.list_products_auctioned);
router.get('/list_products_follows', controllers.information.list_products_follows);
router.get('/list_products_auction', controllers.information.list_products_auction);
router.get('/about', controllers.about.about);
router.get('/contact', controllers.about.contact);
router.get('/login', controllers.login.formLogin);
router.post('/login', controllers.login.submit);
router.get('/signup', controllers.signup.formSignup);
router.post('/signup', controllers.signup.submit);

//router.get('/logout', controllers.login.logout);

module.exports = function (app) {
    app.use('/', router);
}
