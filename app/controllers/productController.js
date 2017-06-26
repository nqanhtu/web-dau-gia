var productModel = require('../models/ProductModel');
var userModel = require('../models/UserModel');
var categoryModel = require('../models/CategoryModel');

productController = {
    Index: function (req, res) {
        categoryModel.GetCategories(function (categories) {
            userModel.GetAllUsers(function (users) {
                res.render('product/add', {
                    userList: users,
                    categories: categories,
                    layout: false
                });
            });
        });
    },

    AddProduct: function (req, res) {

        var entity = {
            name: req.body.productName,
            start_price: req.body.startPrice,
            step_price: req.body.stepPrice,
            price: req.body.price,
            start_time: 'NOW()',
            category: req.body.category,
            end_time: req.body.duration,
            seller_id: req.body.user_picked,
            mainThumbnail: req.body.mainThumbnail,
            thumbnail1: req.body.thumbnail1,
            thumbnail2: req.body.thumbnail2,
            mainImage: req.body.mainImage,
            image1: req.body.image1,
            image2: req.body.image2
        };

        productModel.AddAProductWithImages(entity)
        res.redirect('/product/add');

    }
};

module.exports = productController;