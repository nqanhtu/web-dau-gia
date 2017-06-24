var crypto = require('crypto');
var registerModel = require('../models/RegisterModel');

var registerController = {

    /**
     * Index page render
     */
    Index: function(req, res) {
        res.render('register', {
            layout: false
        });
    },

    AddUser: function(req, res) {
        // Use crypto module to encrypt the password
        var encryptedPassword = crypto.createHash('md5').update(req.body.password).digest('hex');

        // Description of entity
        var entity = {
            full_name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            password: encryptedPassword
        };

        registerModel.AddUser(entity).then(function(insertId) {
            res.redirect('/');
        });
    },
};

module.exports = registerController;
