var firebase = require('firebase');
firebase.initializeApp({
    apiKey: "AIzaSyC7OteVVDRY_bMQdwBgg8BWl7yCETC09Go",
    authDomain: "auction-2e8fd.firebaseapp.com",
    databaseURL: "https://auction-2e8fd.firebaseio.com",
    projectId: "auction-2e8fd",
    storageBucket: "auction-2e8fd.appspot.com",
    messagingSenderId: "564931562317"
});

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
        if (firebase.auth().currentUser) {
            // [START signout]
            firebase.auth().signOut();
            // [END signout]
        }
        firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
            .then(function () {
                console.log('Dang nhap thanh cong');
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

module.exports = loginController;
