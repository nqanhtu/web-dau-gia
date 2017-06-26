var mustache = require('mustache');
var pool = require('./db');

var registerModel = {

    /**
     * Insert a user to database
     * entity: data to insert
     */
    AddUser: function (entity) {


        var sql = mustache.render(
            'INSERT INTO users (`full_name`, `email`, `address`, `password`) VALUES ("{{full_name}}", "{{email}}", "{{address}}", "{{password}}");',
            entity
        );
        pool.getConnection(function (err, connection) {
            connection.query(sql, function (error, results, fields) {
                connection.release();
                if (error) throw error;
            });
        });
    },
};

module.exports = registerModel;