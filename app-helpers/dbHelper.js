var Q = require('q');
var mysql = require('mysql');

var HOST = 'eu-cdbr-west-01.cleardb.com',
    DB = 'heroku_f096d1c00ffe1ff',
    USER = 'b17ec74fc26156',
    PWD = '6eb4c380',
    PORT = '3306';

function connect() {
    var deferred = Q.defer();

    var pool = mysql.createPool({
        connectionLimit: 10,
        host: HOST,
        user: USER,
        password: PWD,
        database: DB,
        port: PORT,
        migrate: 'safe'
    });

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        deferred.resolve(connection);
    });

    return deferred.promise;
}

var db = {
    load: function (sql) {
        var deferred = Q.defer();
        connect().then(function (connection) {
            connection.query(sql, function (err, rows, fields) {
                connection.release();
                if (err) throw err;
                deferred.resolve(rows);

            });
        });
        return deferred.promise;
    },

    insert: function (sql) {

        var deferred = Q.defer();

        connect().then(function (connection) {
            connection.query(sql, function (err, res) {
                connection.release();
                if (err) throw err;
                deferred.resolve(res.insertId);

            });

        });

        return deferred.promise;
    },

    update: function (sql) {

        var deferred = Q.defer();

        connect().then(function (connection) {
            connection.query(sql, function (err, res) {
                connection.release();
                if (err) throw err;

            });


        });

        return deferred.promise;
    },

    delete: function (sql) {

        var deferred = Q.defer();

        connect().then(function (connection) {
            connection.query(sql, function (err, res) {
                connection.release();
                if (err) throw err;
                deferred.resolve(res.affectedRows);

            });


        });
        return deferred.promise;
    }
}

module.exports = db;
