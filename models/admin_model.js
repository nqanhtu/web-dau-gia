var mustache = require('mustache');
database = require('../middlewares/db_helpers');

module.exports = {
    loadUsers: function (callback) {
        var query = 'SELECT * FROM users';
        database.select(query, function (users) {
            callback(users);
        });
    },

    loadProducts: function (callback) {
        var query = 'SELECT P.id AS product_id, P.name AS product_name, C.name AS category_name FROM products P, categories C WHERE P.category = C.id';
        database.select(query, function (products) {
            callback(products);
        });
    },

    loadCategory: function (callback) {
        var query = 'SELECT * FROM categories';
        database.select(query, function (categories) {
            callback(categories);
        });
    },

    loadRequest: function (callback) {
        var query = 'SELECT * FROM upgrade_request R, users U WHERE R.requester_id = U.id';
        database.select(query, function (upgrade_request) {
            callback(upgrade_request);
        });
    },

    updateRequest: function (entity, callback) {
        var query = mustache.render(
            'DELETE FROM upgrade_request WHERE `requester_id` = {{userid}};',
            entity
        );
                console.log(query);

        database.delete(query, function (effectedRows) {
            callback(effectedRows);
        });
    },

    updateTypeUser: function (entity, callback) {
        var query = mustache.render(
            'UPDATE users SET `type` = 1 WHERE `id` = {{userid}};',
            entity
        );
        console.log(query);
        database.update(query, function (effectedRows) {
            callback(effectedRows);
        });
    }
    //       /**
    //  * Update a user to database
    //  * entity: data to insert
    //  */
    //     updatePassword: function (entity, callback) {
    //         var sql = mustache.render(
    //             'UPDATE users SET `password` = "{{password}}" WHERE `email` = "{{oldemail}}";',
    //             entity
    //         );
    //         database.update(sql, function (effectedRows) {
    //             callback(effectedRows);
    //         });
    //     },
    // sendRequesUpgrade: function (entity, callback) {
    //     var sql = mustache.render(
    //         'INSERT INTO upgrade_request (`requester_id`, `comment`) \
    //          VALUES ({{user_id}}, "{{message}}");',
    //         entity
    //     );
    //     database.insert(sql, function (effectedRows) {
    //         callback(effectedRows);
    //     });
    // },
};