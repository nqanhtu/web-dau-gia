var products_followingModel = require('../models/products_followingModel');
var dateFormat = require('dateformat');

var Product_FollowingControler = {

    LoadProducts: function (req, res) {
        products_followingModel.LoadProduct(req.user.id, function (err, products) {

            for (var i = 0; i < products.length; ++i) {
                if (new Date(Date.now()).getTime() > products[i].end_time.getTime())
                    products[i]['isExpired'] = true;
                else
                    products[i]['isExpired'] = false;
                products[i].start_time = dateFormat(products[i].start_time, "yyyy/mm/dd hh:MM:ss");
                products[i].end_time = dateFormat(products[i].end_time, "yyyy/mm/dd hh:MM:ss");
            }
            res.render('list_products_follows', {
                title: 'List products follows',
                layout: 'infor',
                user: req.user,
                products: products,
            });
        });
    },
}

module.exports = Product_FollowingControler;
