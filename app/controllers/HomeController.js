var productModel = require('../models/ProductModel');

var homeController = {


    /**
     * Render index page '/'
     */
    index: function (req, res) {
        productModel.LoadAllProduct().then(function (products) {

            productModel.LoadNumberBidder().then(function (bids) {

                productModel.LoadLastestBidder().then(function (lastestUsers) {

                    // Add new field 'bid_number' to each product
                    for (var i = 0; i < products.length; ++i) {
                        products[i]['bid_number'] = 0;
                        products[i]['lastest_bidder'] = 'NOT BID YET';
                    };

                    for (var i = 0; i < lastestUsers.length; ++i) {
                        for (var j = 0; j < products.length; ++j) {
                            if (products[j].id === lastestUsers[i].product_id) {
                                products[j].lastest_bidder = lastestUsers[i].email;
                            };
                        };
                    };

                    // Update 'bid_number' field each product
                    // by bids table
                    for (var i = 0; i < bids.length; ++i) {
                        for (var j = 0; j < products.length; ++j) {
                            if (products[j].id === bids[i].product_id) {
                                products[j].bid_number = bids[i].bid_number;
                            };
                        };
                    };

                    console.log(products);

                    // Render home page with:
                    //  layout: main.hbs
                    //  products: product list
                    res.render('home', {
                        layout: 'main',
                        products: products
                    });
                });
            });
        });
    },



};

module.exports = homeController;