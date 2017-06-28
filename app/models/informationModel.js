var mustache = require('mustache');
var pool = require('./db');

var informationModel = {

    /**
     * Update a user to database
     * entity: data to insert
     */
    UpdateUser: function (entity) {
        var sql = mustache.render(
            'UPDATE users SET `full_name` = "{{full_name}}", `email` = "{{email}}", `address` = "{{address}}" WHERE `email` = "{{oldemail}}";',
            entity
        );
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(sql, function (error, results, fields) {
                connection.release();
                if (error) throw error;
            });
        });

    },

    /**
 * Update a user to database
 * entity: data to insert
 */
    UpdatePassword: function (entity) {
        var sql = mustache.render(
            'UPDATE users SET `password` = "{{password}}" WHERE `email` = "{{oldemail}}";',
            entity
        );
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(sql, function (error, results, fields) {
                connection.release();
                if (error) throw error;
            });
        });

    },
};

module.exports = informationModel;