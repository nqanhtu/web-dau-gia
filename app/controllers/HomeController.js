var homeModel = require('../models/homeModel');

var homeController = {

    index: function (req, res) {

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