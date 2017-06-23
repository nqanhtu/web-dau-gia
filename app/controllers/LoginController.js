
var loginController = {
    formLogin: function (req, res) {
        res.render("login", 
            {
                layout : false,
            });
    },
    logout: function (req, res) {
        req.logout();
        res.redirect('/');

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
