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
            'INSERT INTO products (`name`, `start_price`, `step_price`, `price`, `start_time`, `category`, `end_time`, `seller_id`) VALUES\
            ("{{name}}", {{start_price}}, {{step_price}}, {{price}}, {{start_time}}, {{category}}, DATE_ADD(NOW(), INTERVAL {{end_time}} DAY), {{seller_id}});',
            entity
        );

        db.insert(sql).then(function (insertId) {
            deffered.resolve(insertId);
            entity["insert_id"] = insertId;
            var sql = mustache.render(
                'INSERT INTO product_images (`product_id`, `index`, `url`, `thumb_url`) VALUES\
                ({{insert_id}}, 1, "{{{mainThumbnail}}}", "{{{mainImage}}}"),\
                ({{insert_id}}, 2, "{{{thumbnail1}}}", "{{{image1}}}"),\
                ({{insert_id}}, 3, "{{{thumbnail2}}}", "{{{image2}}}");',
                entity
            );

            db.insert(sql).then(function (insertId) {
                deffered.resolve(insertId);
            });
        });

        return deffered.promise;
    }
};

module.exports = productModel;