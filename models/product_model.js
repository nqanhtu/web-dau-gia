var database = require('../middlewares/db_helpers');
var mustache = require('mustache');

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
						ORDER BY products.start_price DESC\
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
            WHERE p.end_time > NOW() AND accept = 1\
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
                AND B.end_time >= NOW()\
        ';
        database.select(query, function (lastestBidderAndPrice) {
            callback (lastestBidderAndPrice);
        });
    },

    loadDetail: function(product_id, callback) {
        var query = '\
            SELECT p.id, p.name, p.start_price, p.step_price, p.start_time, p.end_time, u.id user_id, u.full_name, u.like, u.dislike\
            FROM products p, users u\
            WHERE p.id = ' + product_id + '\
                AND p.seller_id = u.id\
                AND p.accept = 1\
                AND p.end_time >= NOW()\
        ';
        database.select(query, function (products) {
            callback (products[0]);
        });
    },

    loadInformationBidder: function (product_id, callback) {
        var query = '\
            SELECT b1.bidder_id, b1.product_id, b1.bidded_price, u.like, u.dislike, u.full_name\
            FROM bids b1, users u\
            WHERE b1.product_id = ' + product_id + '\
                AND b1.bidded_price = (SELECT MAX(b2.bidded_price) FROM bids b2 WHERE b1.product_id = b2.product_id)\
                AND u.id = b1.bidder_id\
        ';
        database.select(query, function (informationOfLastestBidders) {
            callback (informationOfLastestBidders[0]);
        });
    },

    loadBidLog: function (data, callback) {
        var query = '\
            SELECT\
                users.full_name,\
                bids.time,\
                bids.bidded_price\
            FROM\
                bids\
                INNER JOIN users ON bidder_id = id\
            WHERE\
                product_id = {{product_id}};\
        ';
        query = mustache.render(query, data);
        database.select(query, function (logs) {
            callback (logs);
        });
    },

    loadProductImages: function (data, callback) {
        var query = '\
            SELECT *\
            FROM product_images\
            WHERE product_id = {{product_id}};\
        '
        query = mustache.render(query, data);
        database.select(query, function (images) {
            callback (images);
        });
    },

    addBid: function (data, callback) {
        var query = '\
            INSERT INTO bids (bidder_id, product_id, time, bidded_price) VALUES\
                ("{{bidder_id}}", "{{product_id}}", NOW(), "{{bidded_price}}")\
        ';
        query = mustache.render(query, data);
        database.insert(query, function (insertId) {
            callback (insertId);
        });
    },

    loadBidder: function (data, callback) {
        var query = 'SELECT * FROM users WHERE users.id = {{bidder_id}}';
        query = mustache.render(query, data);
        database.select(query, function (bidders) {
            callback (bidders);
        });
    },

    addAProductWithImages: function (entity) {
        var query = mustache.render(
            'INSERT INTO products (`name`, `start_price`, `step_price`, `price`, `start_time`, `category`, `end_time`, `seller_id`) VALUES\
            ("{{name}}", {{start_price}}, {{step_price}}, {{price}}, {{start_time}}, {{category}}, DATE_ADD(NOW(), INTERVAL {{end_time}} DAY), {{seller_id}});',
            entity
        );
        database.insert(query, function (insertId) {
            entity['insert_id'] = insertId;
            var sql2 = mustache.render(
                'INSERT INTO product_images (`product_id`, `index`, `url`, `thumb_url`) VALUES\
                    ({{insert_id}}, 1, "{{{mainThumbnail}}}", "{{{mainImage}}}"),\
                    ({{insert_id}}, 2, "{{{thumbnail1}}}", "{{{image1}}}"),\
                    ({{insert_id}}, 3, "{{{thumbnail2}}}", "{{{image2}}}");',
                entity
            );
            database.insert(sql2, function (insertId) {});
        });
    },

    getCategories: function (callback) {

        var sql = 'SELECT * FROM categories;';
        database.select(sql, function (categories) {
            callback (categories);
        });

    }
}