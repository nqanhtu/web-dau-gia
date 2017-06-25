
var loginController = {
    formLogin: function (req, res) {
        res.render("login",
            {
                layout: false,
            });
    },
    logout: function (req, res) {

        req.logout();
        // req.flash('success_msg', 'You are logged out');
        res.redirect('/login');
    },
    submit: function (req, res) {
        if (!req.user) {
            console.log('Wrong user or password');
        } else {
            console.log('Log in successfully');
        }
    }
}

module.exports = loginController;
