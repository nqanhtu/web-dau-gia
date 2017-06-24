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

    app.get('/register', controllers.register.index);
    app.post('/register', controllers.register.addClient);

    app.get('/', controllers.home.index);

    app.get('/addProduct', controllers.product.index);
    app.post('/addProduct', controllers.product.addProduct);
	
<<<<<<< HEAD
	app.get('/login',controllers.login.formLogin);
	app.post('/login',passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }),controllers.login.submit);

	/**
	 * Get information personal:
	 */
	app.get('/infor_person', controllers.information.information);
=======
	app.get('/login', controllers.login.formLogin);
	app.post('/login', passport.authenticate('local',{ successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
	);
>>>>>>> d2e9940bd3793c33418b5df6cf5c2074a15c3d24
};
