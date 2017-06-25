
var pool = require('./db');

module.exports = {
    getUserByEmail: function (email, callback) {
        pool.getConnection(function (err, connection) {
            // Use the connection
            var sql = 'select * from users where email = ' + '\'' + email + '\'';
            connection.query(sql, function (error, results, fields) {
                // And done with the connection.
                connection.release();
                callback(err, results[0]);
                // Handle error after the release.
                if (error) throw error;

                // Don't use the connection here, it has been returned to the pool.
            });
        });
    },

    getUserByID: function (id, callback) {
        pool.getConnection(function (err, connection) {
            var sql = 'select * from users where id = ' + id;
            connection.query(sql, function (error, results, fields) {
                connection.release();
                callback(err, results[0]);
                // Handle error after the release.
                if (error) throw error;
            });
        });
    }
}