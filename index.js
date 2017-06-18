
var firebase = require('firebase');

var express = require('express');
var app = express();
// app = firebase.initializeApp({
//     apiKey: "AIzaSyC7OteVVDRY_bMQdwBgg8BWl7yCETC09Go",
//     authDomain: "auction-2e8fd.firebaseapp.com",
//     databaseURL: "https://auction-2e8fd.firebaseio.com",
//     projectId: "auction-2e8fd",
//     storageBucket: "auction-2e8fd.appspot.com",
//     messagingSenderId: "564931562317"
// });
require('./config')(app);
var port = process.env.PORT || 8888;
// launch ======================================================================
app.listen(port);
console.log(`Port  ${port}`);
