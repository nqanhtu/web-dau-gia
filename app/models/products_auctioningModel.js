var mustache = require('mustache');
var pool = require('./db');

var products_auctioningModel = {
    /**
     * Load all product function for home page
     * Query all products and show it
     */
    LoadProduct: function (user_id, callback) {
        var obj = {
            user_id: user_id
        };

        var sql = mustache.render(
            'SELECT * FROM products p, bids b where b.`bidder_id` = {{user_id}} AND b.`product_id` = p.`id`;',
            obj
        );

        pool.getConnection(function (err, connection) {
            connection.query(sql, function (error, results, fields) {
                connection.release();
                callback(err, results);
                if (error) throw error;
            });
        });
    },
};

module.exports = products_auctioningModel;