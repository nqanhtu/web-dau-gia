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
		console.log(enPwd);
		User.getUserByEmail(email).then(function (user) {
			if (!user) { return done(null, false, { message: 'Unknown User' }) };
			if (user.password != enPwd) { return done(null, false, { message: 'Invalid password' }) };
			return done(null, user);
		});
	}));
passport.serializeUser(function (user, done) {
	done(null, user.id);
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
	app.get('/login',controllers.login.formLogin);
	app.post('/login',passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }),controllers.login.submit);

	/**
	 * Get information personal:
	 */
	app.get('/infor_person', controllers.information.information);
};
