var productModel = require('../models/ProductModel');

productController = {
    index: function (req, res) {
        res.render('addProduct', {layout: false});
    },
    
    addProduct: function (req, res) {

        var entity = {
            name: req.body.productName,
            startPrice: req.body.startPrice,
            type: req.body.type,
            seller: req.body.seller,
            mainThumbnail: req.body.mainThumbnail,
            thumbnail1: req.body.thumbnail1,
            thumbnail2: req.body.thumbnail2,
            mainImage: req.body.mainImage,
            image1: req.body.image1,
            image2: req.body.image2
        };

        productModel.addAProductWithImages(entity).then(function (insertId) {
            res.render('home', {layout: false});
        });
    }
};

module.exports = productController;