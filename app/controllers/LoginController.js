var firebase = require('firebase');

var loginController = {
    formLogin: function (req, res) {
        //console.log(req.flash('loginMessage'));
        // render the page and pass in any flash data if it exists
        //res.render("login", { message: req.flash('loginMessage')[0] });
        res.render("login");
    },
    logout: function (req, res) {
        req.logout();
        res.redirect('/');

    },
    submit: function (req, res) {
        // if (firebase.auth().currentUser) {
        //     // [START signout]
        //     firebase.auth().signOut();
        //     // [END signout]
        // }
        firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
            .then(function () {
                console.log('Dang nhap thanh cong');
                res.redirect('/');
                firebase.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        
                    } else {
                        // No user is signed in.
                    }
                });
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });


    }

}

module.exports = loginController;
