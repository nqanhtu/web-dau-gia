var mysql = require('mysql');

// var HOST = '192.168.100.6';
// var USER = 'anhvinhitus';
// var PASSWORD = '123456';
// var DATABASE = 'auction_web_db';
var HOST = 'eu-cdbr-west-01.cleardb.com';
var USER = 'b17ec74fc26156';
var PASSWORD = '6eb4c380';
var DATABASE = 'heroku_f096d1c00ffe1ff';

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