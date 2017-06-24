var controllers = require('../app/controllers');
var User = require('../app/models/userModel');
var crypto = require('crypto');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
},
	function (email, password, done) {
		var enPwd = crypto.createHash('md5').update(password).digest('hex');
		User.getUserByEmail(email).then(function (user) {
			if (!user) { return done(null, false, console.log('Unknown User')) };
			if (user.password != enPwd) { return done(null, false, console.log('Invalid password')) };
			return done(null, user);
		});
	}));
passport.serializeUser(function (user, done) {
	done(null, user.id);
});
passport.deserializeUser(function (id, done) {
	User.getUserByID(id).then(function (user) {

	console.log(user);
		done(null, user);
	});
});


module.exports = function (app) {

    app.get('/register', controllers.register.index);
    app.post('/register', controllers.register.addClient);

    app.get('/addProduct', controllers.product.index);
    app.post('/addProduct', controllers.product.addProduct);

	
	/**
	 * Get information personal:
	 */
	app.get('/information', controllers.information.information);

	/**
	 * Get list products auction: 
	 */
	app.get('/list_products_auction', controllers.information.list_products_auction);

	/**
	 * Get list products follows:
	 */
	app.get('/list_products_follows', controllers.information.list_products_follows);

	/**
	 * Get Result Auction:
	 */
	app.get('/list_products_auctioned', controllers.information.list_products_auctioned);

	/**
	 * Shipping Address:
	 */
	app.get('/shipping_address', controllers.information.shipping_address);

	/**
	 * Detail Feedback:
	 */
	app.get('/detail_feedback', controllers.information.detail_feedback);

	/**
	 * Login user
	 */
	app.get('/login', controllers.login.formLogin);
	app.post('/login', passport.authenticate('local',{ successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
	);
};
