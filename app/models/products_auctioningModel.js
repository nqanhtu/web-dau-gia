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
            'SELECT * FROM 	(	SELECT product_id, bidded_price, full_name, bidder_id\
				                FROM bids b1, users u \
				                WHERE u.`id` = b1.`bidder_id` \
				                AND b1.`bidded_price` >= ALL(	SELECT MAX(b2.`bidded_price`) \
																FROM bids b2 \
															    WHERE b2.`product_id` = b1.`product_id`)) AS A,\
			                (	SELECT * \
				                FROM products P, (	SELECT B.product_id \
													FROM bids B \
													WHERE B.bidder_id = {{user_id}} \
													GROUP BY B.product_id) AS U \
				                WHERE P.id = U.product_id) AS B \
            WHERE A.product_id = B.product_id;',
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