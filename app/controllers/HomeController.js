var productModel = require('../models/productModel');

var homeController = {

    index: function (req, res) {
<<<<<<< HEAD
        productModel.loadAllProduct()
            .then(function (products) {
                productModel.loadLastestBidder().then(function (rows) {

                    for(var i = 0; i < products.length; ++i) {
                        products[i]['Bids'] = 0;
                    };

                    for (var i = 0; i < rows.length; ++i) {
                        for (var j = 0; j < products.length; ++j) {
                            console.log(products[j].ID == rows[i].ProductID);
                            if (products[j].ID == rows[i].ProductID) {
                                products[j].Bids = rows[i].Bids;
                            };
                        };
                    };

                    console.log(products);

                    res.render('home', {
                        layout: 'main',
                        products: products,
                        bids: rows
                    });
=======
console.log(req.user);
        homeModel.loadAllProduct()
            .then(function (rows) {
                res.render('home', {
                    layout: 'main',
                    products: rows
>>>>>>> 2a7479e1a2fef89a76e84cf238f3a6f05d61a7ed
                });
            });
    },
};

module.exports = homeController;