var Q = require('q');
var mustache = require('mustache');
var pool = require('./db');

var productModel = {


    /**
     * Load all product function for home page
     * Query all products and show it
     */
    LoadAllProduct: function (callback) {
        var deffered = Q.defer();
        var sql = 'SELECT * FROM products, product_images where `product_id` = `id` and `index` = 1;';
        pool.getConnection(function (err, connection) {
            connection.query(sql, function (error, results, fields) {
                connection.release();
                callback(err, results);
                if (error) throw error;
            });
        });
    },
    /**
     * Load last bidder to show it on the page
     * Plugging it to products information
     */
    LoadNumberBidder: function (callback) {
        var sql = 'SELECT `product_id`, COUNT(*) as `bid_number` FROM bids GROUP BY `product_id`;';
        pool.getConnection(function (err, connection) {
            connection.query(sql, function (error, results, fields) {
                connection.release();
                callback(err, results);
                if (error) throw error;
            });
        });
    },

    /**
     * Load lastest bidder
     */
    LoadLastestBidder: function (callback) {
        var sql = 'SELECT * FROM bids b1, users u WHERE u.`id` = b1.`bidder_id` AND b1.`bidded_price` >= ALL(SELECT MAX(b2.`bidded_price`) FROM bids b2 WHERE b2.`product_id` = b1.`product_id`);';
        pool.getConnection(function (err, connection) {
            connection.query(sql, function (error, results, fields) {
                connection.release();
                callback(err, results);
                if (error) throw error;
            });
        });
    },

    AddAProductWithImages: function (entity, callback) {
        var sql = mustache.render(
            'INSERT INTO products (`name`, `start_price`, `step_price`, `price`, `start_time`, `category`, `end_time`, `seller_id`) VALUES\
            ("{{name}}", {{start_price}}, {{step_price}}, {{price}}, {{start_time}}, {{category}}, DATE_ADD(NOW(), INTERVAL {{end_time}} DAY), {{seller_id}});',
            entity
        );

        pool.getConnection(function (err, connection) {
            connection.query(sql, function (error, results, fields) {
                connection.release();
                callback(results);
                if (error) throw error;
            });
        });
    }
};

module.exports = productModel;