database = require('../middlewares/db_helpers');

module.exports = {
    loadAllProducts: function (callback) {
        var query = '\
            SELECT id product_id, name, start_price, end_time, thumb_url\
            FROM products p, product_images pi\
            WHERE p.end_time > NOW()\
                AND p.accept = 1\
                AND p.id = pi.product_id\
                AND pi.index = 1\
        ';
        database.select(query, function (products) {
            callback (products);
        });
    },

    loadOthersProducts: function (callback) {
        var query = '\
            SELECT p.id product_id, p.name, p.start_price, p.end_time, pi.thumb_url\
            FROM products p, product_images pi, categories c\
            WHERE p.end_time > NOW()\
                    AND p.accept = 1\
                    AND p.id = pi.product_id\
                    AND pi.index = 1\
                    AND p.category = c.id\
                    AND c.id = 1\
        ';
        database.select(query, function (products) {
            callback (products);
        });
    },

    loadTechnologyProducts: function (callback) {
        var query = '\
            SELECT p.id product_id, p.name, p.start_price, p.end_time, pi.thumb_url\
            FROM products p, product_images pi, categories c\
            WHERE p.end_time > NOW()\
                    AND p.accept = 1\
                    AND p.id = pi.product_id\
                    AND pi.index = 1\
                    AND p.category = c.id\
                    AND c.id = 2\
        ';
        database.select(query, function (products) {
            callback (products);
        });
    },

    loadFashionProducts: function (callback) {
        var query = '\
            SELECT p.id product_id, p.name, p.start_price, p.end_time, pi.thumb_url\
            FROM products p, product_images pi, categories c\
            WHERE p.end_time > NOW()\
                    AND p.accept = 1\
                    AND p.id = pi.product_id\
                    AND pi.index = 1\
                    AND p.category = c.id\
                    AND c.id = 3\
        ';
        database.select(query, function (products) {
            callback (products);
        });
    },

    loadHousewareProducts: function (callback) {
        var query = '\
            SELECT p.id product_id, p.name, p.start_price, p.end_time, pi.thumb_url\
            FROM products p, product_images pi, categories c\
            WHERE p.end_time > NOW()\
                    AND p.accept = 1\
                    AND p.id = pi.product_id\
                    AND pi.index = 1\
                    AND p.category = c.id\
                    AND c.id = 4\
        ';
        database.select(query, function (products) {
            callback (products);
        });
    },

    loadTop4MostBidded: function (callback) {
        var query = '\
            SELECT res.product_id, name, end_time, start_price, pi.thumb_url\
            FROM products, product_images pi,\
                (SELECT product_id, COUNT(*) bid_num\
                FROM bids b, products p\
                WHERE b.product_id = p.id AND p.accept = 1\
                GROUP BY product_id\
                ORDER BY bid_num DESC) res\
            WHERE id = res.product_id AND end_time >= NOW()\
                AND pi.product_id = res.product_id\
                AND pi.index = 1\
            LIMIT 0, 4\
        ';
        database.select(query, function (top4MostBiddedProducts) {
            callback (top4MostBiddedProducts);
        });
    },

    loadTop4HighestPrice: function (callback) {
        var query = '\
            SELECT b.product_id, name, start_price, end_time, pi.thumb_url\
            FROM\
                bids b, products p, product_images pi\
            WHERE (b.product_id, b.bidded_price) IN (SELECT product_id, MAX(bidded_price) bidded_price FROM bids GROUP BY product_id ORDER BY bidded_price DESC)\
                AND p.id = b.product_id\
                AND p.accept = 1\
                AND p.end_time >= NOW()\
                AND pi.product_id = b.product_id\
                AND pi.index = 1\
            ORDER BY bidded_price DESC\
            LIMIT 0, 4\
        ';
        database.select(query, function (top4MostHighestPriceProducts) {
            callback (top4MostHighestPriceProducts);
        });
    },

    loadTop4NearEnd: function (callback) {
        var query = '\
            SELECT p.id product_id, name, start_price, end_time, pi.thumb_url\
            FROM products p, product_images pi\
            WHERE p.end_time >= NOW() AND accept = 1\
                AND pi.product_id = p.id\
                AND pi.index = 1\
            ORDER BY p.end_time ASC\
            LIMIT 0, 4\
        ';
        database.select(query, function (top4MostNearEndProducts) {
            callback (top4MostNearEndProducts);
        });
    },

    loadLastestBidderAndPrice: function (callback) {
        var query = '\
            SELECT A.product_id, B.name, B.number_bids, A.full_name, A.bidded_price\
            FROM 	(	SELECT product_id, bidded_price, full_name, bidder_id\
                            FROM bids b1, users u\
                            WHERE u.`id` = b1.`bidder_id`\
                            AND b1.`bidded_price` >= ALL(	SELECT MAX(b2.`bidded_price`)\
                                                            FROM bids b2\
                                                            WHERE b2.`product_id` = b1.`product_id`)) AS A,\
                        (	SELECT *\
                            FROM products P, (	SELECT B.product_id, COUNT(*)AS number_bids\
                                                FROM bids B\
                                                GROUP BY B.product_id) AS U\
                            WHERE P.id = U.product_id) AS B\
            WHERE A.product_id = B.product_id\
                AND B.end_time > NOW()\
        ';
        database.select(query, function (lastestBidderAndPrice) {
            callback (lastestBidderAndPrice);
        });
    },

    loadDetail: function(product_id) {
        
    }
}