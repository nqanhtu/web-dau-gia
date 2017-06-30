var products_auctionedModel = require('../models/products_auctionedModel');
var dateFormat = require('dateformat');

var Product_AuctionedControler = {

    LoadProducts: function (req, res) {
        products_auctionedModel.LoadProduct(req.user.id, function (err, products) {

            for (var i = 0; i < products.length; ++i) {
                if (products[i].winner.equals(new Buffer.alloc(1)))
                    products[i]['status'] = false;
                else
                    products[i]['status'] = true;
                products[i].start_time = dateFormat(products[i].start_time, "yyyy/mm/dd hh:MM:ss");
                products[i].end_time = dateFormat(products[i].end_time, "yyyy/mm/dd hh:MM:ss");
            }
            console.log(products);
            res.render('list_products_auctioned', {
                title: 'Products auctioned',
                layout: 'infor',
                user: req.user,
                products: products,
            });
        });
    },
}

module.exports = Product_AuctionedControler;
