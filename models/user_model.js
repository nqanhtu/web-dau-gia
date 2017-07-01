var mustache = require('mustache');
database = require('../middlewares/db_helpers');

module.exports = {

    updatePoint: function (entity, callback) {
        var sql = mustache.render(
            'UPDATE users SET `like` = {{like}}, `dislike` = {{dislike}}  WHERE `id` = "{{id}}";',
            entity
        );
        database.update(sql, function (effectedRows) {
            callback(effectedRows);
        });
    },
    /**
     * Update a user to database
     * entity: data to insert
     */
    updateInformation: function (entity, callback) {
        var sql = mustache.render(
            'UPDATE users SET `full_name` = "{{full_name}}", `email` = "{{email}}", `address` = "{{address}}" WHERE `email` = "{{oldemail}}";',
            entity
        );
        database.update(sql, function (effectedRows) {
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
        database.update(sql, function (effectedRows) {
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
            'SELECT A.product_id, B.`name`, A.full_name, A.bidder_id, A.bidded_price, B.end_time, U.full_name as seller, P.seller_id \
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
				        AND P.end_time < NOW() \
                        AND P.accept = 1) AS B,\
			        users U, \
			        products P \
            WHERE A.product_id = B.product_id \
            AND 	U.id = P.seller_id \
            AND   P.id = A.product_id;',
            obj
        );
        database.select(sql, function (products) {
            callback(products);
        });
    },

    LoadAllRating: function (callback) {
        var query = 'SELECT * FROM rating';
        database.select(query, function (categories) {
            callback(categories);
        });
    },

    insertRating: function (entity, callback) {
        var sql = mustache.render(
            'INSERT INTO rating (`rated_id`, `rating_id`, `product_id`, `comment`, `point`, `flag`) \
             VALUES ({{rated_id}}, {{rating_id}}, {{product_id}}, "{{comment}}", {{point}}, {{flag}});',
            entity
        );
        console.log(sql);  
        database.insert(sql, function (insertId) {
            callback(insertId);
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
                                AND P.end_time > NOW() \
                                AND P.accept = 1) AS B \
            WHERE A.product_id = B.product_id;',
            obj
        );
        database.select(sql, function (products) {
            callback(products);
        });
    },

    /* Products Selling */
    LoadProductsSelling: function (user_id, callback) {
        var obj = {
            user_id: user_id
        };

        var sql = mustache.render(
            'SELECT* \
             FROM ( SELECT *  \
                    FROM 	(	SELECT product_id, bidded_price, full_name, bidder_id, winner \
				                FROM bids b1, users u \
				                WHERE u.`id` = b1.`bidder_id` \
				                AND b1.`bidded_price` >= ALL(	SELECT MAX(b2.`bidded_price`)  \
																FROM bids b2 \
																WHERE b2.`product_id` = b1.`product_id`)) AS A \
				    RIGHT JOIN products P ON  A.product_id = P.id) AS B \
            WHERE   B.seller_id = {{user_id}} \
            AND     B.end_time > NOW();', 
            obj
        );
        database.select(sql, function (products) {
            callback(products);
        });
    },

    LoadProductsBought: function (user_id, callback) {
        var obj = {
            user_id: user_id
        };

        var sql = mustache.render(
            'SELECT * \
             FROM ( SELECT *  \
                    FROM 	(	SELECT product_id, bidded_price, full_name, bidder_id, winner \
				                FROM bids b1, users u \
				                WHERE u.`id` = b1.`bidder_id` \
				                AND b1.`bidded_price` >= ALL(	SELECT MAX(b2.`bidded_price`)  \
																FROM bids b2 \
																WHERE b2.`product_id` = b1.`product_id`)) AS A \
				    RIGHT JOIN products P ON  A.product_id = P.id) AS B \
            WHERE B.seller_id = {{user_id}} \
            AND 	B.winner = 1;', 
            obj
        );
        database.select(sql, function (products) {
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
        database.select(sql, function (products) {
            callback(products);
        });
    },

    /* Detail Feedback */
    loadDetailFeedback: function (user_id, callback) {
        var obj = {
            user_id: user_id
        };

        var sql = mustache.render(
            'SELECT U.`full_name`, R.`comment`, R.point, P.`name`, R.flag, P.id \
             FROM rating R, users U, products P \
             WHERE  R.rating_id = {{user_id}} \
             AND 	R.product_id = P.id \
             AND	U.id = R.rated_id;',
            obj
        );
        database.select(sql, function (products) {
            callback(products);
        });
    },

    /* Upgrade Account */
    checkUpgrage: function (user_id, callback) {
        var obj = {
            user_id: user_id
        };

        var sql = mustache.render(
            'SELECT `requester_id` FROM upgrade_request WHERE `requester_id` = {{user_id}};',
            obj
        );
        database.select(sql, function (users) {
            callback(users);
        });
    },

    sendRequesUpgrade: function (entity, callback) {
        var sql = mustache.render(
            'INSERT INTO upgrade_request (`requester_id`, `comment`) \
             VALUES ({{user_id}}, "{{message}}");',
            entity
        );
        database.insert(sql, function (effectedRows) {
            callback(effectedRows);
        });
    },
};