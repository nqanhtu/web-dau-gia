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
    app.post('/user/register', passport.authenticate('local-register', {
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

<<<<<<< HEAD
=======
var crypto = require('crypto');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
},
	function (email, password, done) {
		var enPwd = crypto.createHash('md5').update(password).digest('hex');
		userModel.getUserByEmail(email, function (err, user) {
			if (!user) { return done(null, false, console.log('Unknown User')) };
			if (user.password != enPwd) { return done(null, false, console.log('Invalid password')) };
			return done(null, user);
		});
	}));
passport.serializeUser(function (user, done) {
	done(null, user.id);
});
passport.deserializeUser(function (id, done) {
	userModel.getUserByID(id, function (err, user) {
		done(null, user);
	});
});


function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/login');
	}
}

module.exports = function (app) {

	app.get('/register', controllers.register.Index);
	app.post('/register', controllers.register.AddUser);

	app.get('/product/add', controllers.product.Index);
	app.post('/product/add', controllers.product.AddProduct);

	app.get('/', controllers.home.index);
	/**
	 * Get information personal:
	 */
	app.get('/information', ensureAuthenticated, controllers.information.information);
	app.post('/information', controllers.information.updateInfo);

	/**
	 * Get/Post password:
	 */
	app.get('/change_password', controllers.information.changePassword);
	app.post('/change_password', controllers.information.updatePassword);

	/**
	 * Get list products auction: 
	 */
	app.get('/list_products_auction', ensureAuthenticated, controllers.productsauctioning.LoadProducts);

	/**
	 * Get list products follows:
	 */
	app.get('/list_products_follows', ensureAuthenticated, controllers.productsfollowing.LoadProducts);

	/**
	 * Get Result Auction:
	 */
	app.get('/list_products_auctioned', ensureAuthenticated, controllers.productsauctioned.LoadProducts);

	/**
	 * Detail Feedback:
	 */
	app.get('/detail_feedback', controllers.information.detail_feedback);

	/**
	 * Login user
	 */
	app.get('/login', controllers.login.formLogin);
	app.post('/login', passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	})
	);

	app.get('/logout', controllers.login.logout);
>>>>>>> fda607159d9c2c8a2e5875a713e74b0a406948d8

};

function redirect(user) {
    if (user.type === -1) {
        return '/admin/profile'
    }
    return '/user/profile'
};