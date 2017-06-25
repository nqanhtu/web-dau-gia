var productModel = require('../models/ProductModel');
var userModel = require('../models/UserModel');
var categoryModel = require('../models/CategoryModel');

productController = {
    Index: function (req, res) {

        // Get all categories
        categoryModel.GetCategories().then(function(categories) {
            // Get all users for admin pick
            userModel.GetAllUsers().then(function(userList) {
                // Render add product page
                res.render('product/add', {
                    userList: userList,
                    categories: categories,
                    layout: false
                });
            });
        });
    },
    
    AddProduct: function (req, res) {

        console.log(req.body);

        var entity = {
            name: req.body.productName,
            startPrice: req.body.startPrice,
            price: req.body.price,
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