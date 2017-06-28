var mustache = require('mustache');
var pool = require('./db');

var products_followingModel = {
    /**
     * Load all product function for home page
     * Query all products and show it
     */
    LoadProduct: function (user_id, callback) {
        var obj = {
            user_id: user_id
        };

        var sql = mustache.render(
            'SELECT * FROM products p, following f where f.`follower` = {{user_id}} AND f.`product_id` = p.`id`;',
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

module.exports = products_followingModel;