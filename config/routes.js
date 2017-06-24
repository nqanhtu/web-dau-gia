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
	app.post('/login',passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: false }));

	/**
	 * Get information personal:
	 */
	app.get('/infor_person', controllers.information.information);
};
