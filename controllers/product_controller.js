var models = require('../models/index');
<<<<<<< HEAD
var dateFormat = require('dateformat');

module.exports = {
    detail: function (req, res) {
        models.product.loadDetail(req.params.id, function (product) {
            models.product.loadInformationBidder(product.id, function (informationOfLastestBidder) {
                var data = {
                    product_id: product.id,
                    name: product.name,
                    start_time: product.start_time,
                    step_price: product.step_price,
                    end_time: product.end_time,
                    price: product.start_price,
                    seller_id: product.user_id,
                    seller_full_name: product.full_name,
                    seller_like: product.like,
                    seller_dislike: product.dislike,
                    // bidder
                    bidder_like: 0,
                    bidder_dislike: 0,
                    bidder_full_name: 'NOT BID YET',
                    isShow: true
                };

                if(req.user) {
                    if(req.user.id === data.seller_id)
                        data.isShow = false;
                }

                data.start_time = dateFormat(data.start_time, "yyyy/mm/dd hh:MM:ss");
                data.end_time = dateFormat(data.end_time, "yyyy/mm/dd hh:MM:ss");

                if(informationOfLastestBidder) {
                    data.price = informationOfLastestBidder.bidded_price;
                    data.bidder_like = informationOfLastestBidder.like;
                    data.bidder_dislike = informationOfLastestBidder.dislike;
                    data.bidder_full_name = informationOfLastestBidder.full_name;
                    data.bidder_full_name = encryptFullName(data.bidder_full_name);
                }

                // Add suggest price for bidder
                data['suggest_price'] = data.price + data.step_price;

                models.product.loadBidLog(data, function (logs) {
                    for(var i = 0; i < logs.length; ++i) {
                        logs[i].full_name = encryptFullName(logs[i].full_name);
                        logs[i].time = dateFormat(logs[i].time, "yyyy/mm/dd hh:MM:ss");
                    }                  
                    models.product.loadProductImages(data, function (images) {
                        res.render('product/detail', {
                            layout: 'product_detail',
                            title: data.name,
                            user: req.user,
                            data: data,
                            logs: logs,
                            first_image: images[0],
                            second_image: images[1],
                            third_image: images[2]
                        });
                    });
                });
            });
        });
    },

    bid: function (req, res) {
        var data = {
            bidder_id: req.user.id,
            product_id: req.body.product_id,
            bidded_price: req.body.bidded_price
        }
        models.product.loadBidder(data, function (bidders) {
            var per = bidders[0].like / (bidders[0].like + bidders[0].dislike);
            if (per >= 0.8) {
                models.product.addBid(data, function (insertId) {
                    var link = '/product/detail/' + data.product_id;
                    res.redirect(link);
                });
            }
        });
    },

    add: function (req, res) {
        models.product.getCategories(function (categories) {
            res.render('product/add', {
                layout: false,
                categories: categories
            });
        });
    },

    insertProduct: function (req, res) {
        var entity = {
            name: req.body.productName,
            start_price: req.body.startPrice,
            step_price: req.body.stepPrice,
            price: req.body.price,
            start_time: 'NOW()',
            category: req.body.category,
            end_time: req.body.duration,
            seller_id: req.user.id,
            mainThumbnail: req.body.mainThumbnail,
            thumbnail1: req.body.thumbnail1,
            thumbnail2: req.body.thumbnail2,
            mainImage: req.body.mainImage,
            image1: req.body.image1,
            image2: req.body.image2
        };

        models.product.addAProductWithImages(entity);
        res.redirect('/');
    },

    follow: function(req, res) {
        console.log(req.body);
    }
}

function encryptFullName (name) {
    for(var j = 0; j < name.length; j++)
        if(j % 2 === 0)
            name = name.substring(0, j - 1)
            + '*' + name.substring(j, name.length);

    return name;
=======

module.exports = {
    detail: function (req, res) {
        res.render('./product/detail', {
            layout: 'product_detail',
            title: 'ccdsf',
            user: req.user
        });
        //models.product.loadDetail(req.params.id);
    }
>>>>>>> 9a27b571be32885d7cad2ab940bdcb75d1c16fac
}