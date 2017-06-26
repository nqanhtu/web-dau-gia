var controllers = require('../app/controllers');
var userModel = require('../app/models/usermodel');

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

};
