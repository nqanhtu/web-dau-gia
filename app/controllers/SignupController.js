var firebase = require('firebase');
var signupController = {
    formSignup: function (req, res) {
        //console.log(req.flash('loginMessage'));
        // render the page and pass in any flash data if it exists
        //res.render("login", { message: req.flash('loginMessage')[0] });
        res.render("signup");
    },

    submit: function (req, res) {
        if (firebase.auth().currentUser) {
            // [START signout]
            firebase.auth().signOut();
            // [END signout]
        }
        firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
            .then(function () {
                console.log('Dang ky thanh cong');
                res.redirect('/');
                console.log(firebase.auth().currentUser.email);
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });


    }

}

module.exports = signupController;
