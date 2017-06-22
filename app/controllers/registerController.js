var crypto = require('crypto');
var registerModel = require('../models/registerModel');

var registerController = {
    index: function(req, res) {
        res.render('register', {
            layout: false
        });
    },

    addClient: function(req, res) {
        var enPwd = crypto.createHash('md5').update(req.body.password).digest('hex');
        var entity = {
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            password: enPwd
        };

        registerModel.insert(entity).then(function(insertId) {
            res.render('home', {layout: false});
        });
    },
};

module.exports = registerController;
