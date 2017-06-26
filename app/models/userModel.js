
var pool = require('./db');

module.exports = {
    getUserByEmail: function (email, callback) {
        pool.getConnection(function (err, connection) {
            // Use the connection
            var sql = 'select * from users where email = ' + '\'' + email + '\'';
            connection.query(sql, function (error, results, fields) {
                if (err) {
                    // connection.release(); <-- this line is in error, as if there was an error getting a connection, then you won't have a connection to release
                    throw err;
                }
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
            if (err) {
                // connection.release(); <-- this line is in error, as if there was an error getting a connection, then you won't have a connection to release
                throw err;
            }
            var sql = 'select * from users where id = ' + id;
            connection.query(sql, function (error, results, fields) {
                connection.release();
                callback(err, results[0]);
                // Handle error after the release.
                if (error) throw error;
            });
        });
    },
    GetAllUsers: function (callback) {
        var sql = 'SELECT id, full_name FROM users WHERE admin = 0;'
        pool.getConnection(function (err, connection) {
            if (err) {
                // connection.release(); <-- this line is in error, as if there was an error getting a connection, then you won't have a connection to release
                throw err;
            }
            connection.query(sql, function (error, results, fields) {
                connection.release();
                callback(results);
                if (error) throw error;
            });
        });
    }
}