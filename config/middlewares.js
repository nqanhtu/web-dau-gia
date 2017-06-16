var express = require('express');
var firebase = require('firebase');

 var app = firebase.initializeApp({
    apiKey: "AIzaSyC7OteVVDRY_bMQdwBgg8BWl7yCETC09Go",
    authDomain: "auction-2e8fd.firebaseapp.com",
    databaseURL: "https://auction-2e8fd.firebaseio.com",
    projectId: "auction-2e8fd",
    storageBucket: "auction-2e8fd.appspot.com",
    messagingSenderId: "564931562317"
  });
  
module.exports = function (app) {
    app.use(express.static('public'));
}