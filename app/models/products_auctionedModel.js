var mustache = require('mustache');
var pool = require('./db');

var products_auctionedModel = {
    /**
     * Load all product function for home page
     * Query all products and show it
     */
    LoadProduct: function (user_id, callback) {
        var obj = {
            user_id: user_id
        };

        var sql = mustache.render(
            'SELECT A.product_id, B.`name`, A.full_name, A.bidder_id, A.bidded_price, B.winner, B.end_time \
	         FROM 	(	SELECT product_id, bidded_price, full_name, bidder_id \
				        FROM bids b1, users u \
				        WHERE u.`id` = b1.`bidder_id` \
				        AND b1.`bidded_price` >= ALL(	SELECT MAX(b2.`bidded_price`) \
														FROM bids b2 \
														WHERE b2.`product_id` = b1.`product_id`)) AS A, \
			        (	SELECT * \
				        FROM products P, (	SELECT B.product_id, B.winner \
											FROM bids B \
											WHERE bidder_id = 4 \
											GROUP BY B.product_id, B.winner) AS U \
				        WHERE P.id = U.product_id \
				        AND P.end_time < NOW()) AS B \
	        WHERE A.product_id = B.product_id ;',
            obj
        );
        
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(sql, function (error, results, fields) {
                connection.release();
                callback(err, results);
                if (error) throw error;
            });
        });
    },
};

module.exports = products_auctionedModel;