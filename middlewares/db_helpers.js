var mysql = require('mysql');

// var HOST = '192.168.100.6';
// var USER = 'anhvinhitus';
// var PASSWORD = '123456';
// var DATABASE = 'auction_web_db';
var HOST = 'localhost';
var USER = 'root';
var PASSWORD = '123456';
var DATABASE = 'hello';

var pool = mysql.createPool({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
    acquireTimeout: 100000
});
module.exports = {
    select: function (query, callback) {
        pool.getConnection(function (connectError, connection) {
            if (connectError) throw connectError;
            connection.query(query, function (queryError, result, fields) {
                connection.release();
                if (queryError) throw queryError;
                callback(result);
            });
        });
    },

    insert: function (query, callback) {
        pool.getConnection(function (connectError, connection) {
            if (connectError) throw connectError;
            connection.query(query, function (queryError, result, fields) {
                connection.release();
                if (queryError) throw queryError;
                callback(result.insertId);
            });
        });
    },

    update: function (query, callback) {
        pool.getConnection(function (connectError, connection) {
            if (connectError) throw connectError;
            connection.query(query, function (queryError, result, fields) {
                connection.release();
                if (queryError) throw queryError;
                callback(result.affectedRows);
            });
        });
    },

    delete: function (query, callback) {
        pool.getConnection(function (connectError, connection) {
            if (connectError) throw connectError;
            connection.query(query, function (queryError, result, fields) {
                connection.release();
                if (queryError) throw queryError;
                callback(result.affectedRows);

            });
        });
    },

    passportSelect: function (query, callback) {
        pool.getConnection(function (connectError, connection) {
            if (connectError) throw connectError;
            connection.query(query, function (queryError, result, fields) {
                connection.release();
                callback(queryError, result);
            });
        });
    },

    passportInsert: function (query, callback) {
        pool.getConnection(function (connectError, connection) {
            if (connectError) throw connectError;
            connection.query(query, function (queryError, result, fields) {
                connection.release();
                callback(queryError, result);

            });
        });
    }
}