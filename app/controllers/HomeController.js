var homeModel = require('../models/homeModel');

var homeController = {

    index: function (req, res) {
console.log(req.user);
        homeModel.loadAllProduct()
            .then(function (rows) {
                res.render('home', {
                    layout: 'main',
                    products: rows
                });
            });
    },
};

module.exports = homeController;