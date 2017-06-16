var loginController = {
	formLogin : function(req, res) {
		//console.log(req.flash('loginMessage'));
		// render the page and pass in any flash data if it exists
		res.render("login", { message: req.flash('loginMessage')[0] });
	},
	logout: function(req, res) {
		req.logout();
		res.redirect('/');
	}

}

module.exports = loginController;
