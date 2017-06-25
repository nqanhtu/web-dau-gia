//var productModel = require('../models/ProductModel');
var product = require('../models/product');
var dateFormat = require('dateformat');

var homeController = {


    /**
     * Render index page '/'
     */
    index: function (req, res) {
        product.LoadAllProduct(function (err,products) {
            console.log(products);
            product.LoadNumberBidder(function (err,bids) {
                console.log(bids);
                product.LoadLastestBidder(function (err,lastestUsers) {
                    console.log(lastestUsers);
                    for (var i = 0; i < products.length; ++i) {
                        products[i].start_time = dateFormat(products[i].start_time, "yyyy/mm/dd hh:MM:ss");
                        products[i].end_time = dateFormat(products[i].end_time, "yyyy/mm/dd hh:MM:ss");
                    }

                    // Add new field 'bid_number' to each product
                    for (var i = 0; i < products.length; ++i) {
                        products[i]['bid_number'] = 0;
                        products[i]['lastest_bidder'] = 'NOT BID YET';
                        products[i]['current_price'] = products[i].start_price;
                    };

                    for (var i = 0; i < lastestUsers.length; ++i) {
                        for (var j = 0; j < products.length; ++j) {
                            if (products[j].id === lastestUsers[i].product_id) {
                                products[j].lastest_bidder = lastestUsers[i].email;
                                products[j].current_price = lastestUsers[i].bidded_price;
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