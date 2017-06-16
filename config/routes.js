var express = require('express');
var router = express.Router();
var controllers = require('../app/controllers');

router.get('/', controllers.home.index);
router.get('/information', controllers.information.information);
router.get('/shipping_address', controllers.information.shipping_address);
router.get('/list_products_auctioned', controllers.information.list_products_auctioned);
router.get('/list_products_follows', controllers.information.list_products_follows);
router.get('/list_products_auction', controllers.information.list_products_auction);
router.get('/about', controllers.about.about);
router.get('/contact', controllers.about.contact);
//router.get('/signup', controllers.login.formSignup);
//router.get('/logout', controllers.login.logout);

module.exports = function (app) {
    app.use('/', router);
}
