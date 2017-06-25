var Q = require('q');
var mustache = require('mustache');
var db = require('../../app-helpers/dbHelper');

var productModel = {


    /**
     * Load all product function for home page
     * Query all products and show it
     */
    LoadAllProduct: function () {

        var deffered = Q.defer();
        var sql = 'SELECT * FROM products, product_images where `product_id` = `id` and `index` = 1;';

        db.load(sql).then(function (rows) {
            deffered.resolve(rows);
        });

        return deffered.promise;
    },



    /**
     * Load last bidder to show it on the page
     * Plugging it to products information
     */
    LoadNumberBidder: function () {
        var deffered = Q.defer();
        var sql = 'SELECT `product_id`, COUNT(*) as `bid_number` FROM bids GROUP BY `product_id`;';

        db.load(sql).then(function (rows) {
            deffered.resolve(rows);
        });

        return deffered.promise;
    },

    /**
     * Load lastest bidder
     */
    LoadLastestBidder: function() {
        var deffered = Q.defer();
        var sql = 'SELECT * FROM bids b1, users u WHERE u.`id` = b1.`bidder_id` AND b1.`bidded_price` >= ALL(SELECT MAX(b2.`bidded_price`) FROM bids b2 WHERE b2.`product_id` = b1.`product_id`);';

        db.load(sql).then(function (rows) {
            deffered.resolve(rows);
        });

        return deffered.promise;
    },

    AddAProductWithImages: function (entity) {
        var deffered = Q.defer();
        var sql = mustache.render(
            'insert into products(Name, StartPrice, StepPrice, StartTime, FinishTime, Type, Seller) values (\'{{name}}\', {{startPrice}}, 10000, now(), date_add(now(), interval 3 day), {{type}}, {{seller}});',
            entity
        );

        console.log(sql);

        // db.insert(sql).then(function (insertId) {
        //     deffered.resolve(insertId);
        //     entity["insertId"] = insertId;
        //     var insertImagesSql = mustache.render(
        //         'insert into images(ProductID, `Index`, ThumbnailUrl, ImageUrl) values ({{insertId}}, 1, \'{{{mainThumbnail}}}\', \'{{{mainImage}}}\'),\
        //         ({{insertId}}, 2, \'{{{thumbnail1}}}\', \'{{{image1}}}\'), ({{insertId}}, 3, \'{{{thumbnail2}}}\', \'{{{image2}}}\');',
        //         entity
        //     );

        //     db.insert(insertImagesSql).then(function (insertId) {
        //         deffered.resolve(insertId);
        //     });
        // });

        return deffered.promise;
    }
};

module.exports = productModel;