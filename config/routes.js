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
			if (user.Password != enPwd) { return done(null, false, console.log('Invalid password')) };
			console.log(user);
			return done(null, user);
		});
	}));
passport.serializeUser(function (user, done) {
	console.log(user.Email);
	done(null, user.ID);
});
passport.deserializeUser(function (id, done) {
	User.getUserByID(id).then(function (user) {
		done(err, user);
	});
});


module.exports = function (app) {
    /**
     * register page route
     */
	app.get('/register', controllers.register.index);

    /**
     * add a client to database
     */
	app.post('/register', controllers.register.addClient);

	app.get('/', controllers.home.index);
	
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
