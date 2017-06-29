var mustache = require('mustache');
database = require('../middlewares/db_helpers');

module.exports  = {

    /**
     * Update a user to database
     * entity: data to insert
     */
    updateInformation: function (entity, callback) {
        var sql = mustache.render(
            'UPDATE users SET `full_name` = "{{full_name}}", `email` = "{{email}}", `address` = "{{address}}" WHERE `email` = "{{oldemail}}";',
            entity
        );
        database.update(sql, function(effectedRows) {
            callback(effectedRows);
        });
    },

    /**
 * Update a user to database
 * entity: data to insert
 */
    updatePassword: function (entity, callback) {
        var sql = mustache.render(
            'UPDATE users SET `password` = "{{password}}" WHERE `email` = "{{oldemail}}";',
            entity
        );
        database.update(sql, function(effectedRows) {
            callback(effectedRows);
        });
    },

    /**
     * Load all product function for home page
     * Query all products and show it
     */
    LoadProductsAutioned: function (user_id, callback) {
        var obj = {
            user_id: user_id
        };

        var sql = mustache.render(
            'SELECT A.product_id, B.`name`, A.full_name, A.bidder_id, A.bidded_price, B.end_time \
	         FROM 	(	SELECT product_id, bidded_price, full_name, bidder_id \
				        FROM bids b1, users u \
				        WHERE u.`id` = b1.`bidder_id` \
				        AND b1.`bidded_price` >= ALL(	SELECT MAX(b2.`bidded_price`) \
														FROM bids b2 \
														WHERE b2.`product_id` = b1.`product_id`)) AS A, \
			        (	SELECT * \
				        FROM products P, (	SELECT B.product_id \
											FROM bids B \
											WHERE bidder_id = {{user_id}} \
											GROUP BY B.product_id) AS U \
				        WHERE P.id = U.product_id \
				        AND P.end_time < NOW()) AS B \
	        WHERE A.product_id = B.product_id ;',
            obj
        );
        database.select(sql, function(products) {
            callback(products);
        });
    },

    /* Product Auctioning */
    LoadProductsAuctioning: function (user_id, callback) {
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
				                WHERE P.id = U.product_id \
                                AND P.end_time > NOW()) AS B \
            WHERE A.product_id = B.product_id;',
            obj
        );
        database.select(sql, function(products) {
            callback(products);
        });
    },

    /* Products Follows */
    LoadProductsFollows: function (user_id, callback) {
        var obj = {
            user_id: user_id
        };

        var sql = mustache.render(
            'SELECT * FROM products p, following f where f.`follower` = {{user_id}} AND f.`product_id` = p.`id`;',
            obj
        );
        database.select(sql, function(products) {
            callback(products);
        });
    },
};