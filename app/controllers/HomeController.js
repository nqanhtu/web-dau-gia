var productModel = require('../models/ProductModel');

var homeController = {


    /**
     * Render index page '/'
     */
    index: function (req, res) {
        productModel.LoadAllProduct().then(function (products) {

            productModel.LoadLastestBidder().then(function (bids) {

                // Add new field 'bid_number' to each product
                for(var i = 0; i < products.length; ++i) {
                    products[i]['bid_number'] = 0;
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
    },



};

module.exports = homeController;