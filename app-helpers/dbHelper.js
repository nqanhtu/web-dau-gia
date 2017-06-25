var Q = require('q');
var mysql = require('mysql');

var HOST = '127.0.0.1',
    DB = 'Auction',
    USER = 'root',
    PWD = '',
    PORT = '3306';

function connect() {
    var deferred = Q.defer();

    var cn = mysql.createConnection({
        connectionLimit: 3,
        host: HOST,
        user: USER,
        password: PWD,
        database: DB,
        port: PORT
    });

    cn.connect(function(err) {
        if (err) throw err;
        deferred.resolve(cn);
    });

    return deferred.promise;
}

var auctionDb = {
    load: function(sql) {
        var deferred = Q.defer();
        connect().then(function(cn) {
            cn.query(sql, function(err, rows, fields) {
                if (err) throw err;
                deferred.resolve(rows);
            });
        });
        return deferred.promise;
    },

    insert: function(sql) {

        var deferred = Q.defer();

        connect().then(function(cn) {
            cn.query(sql, function(err, res) {
                if (err) throw err;
                deferred.resolve(res.insertId);
            });
        });

        return deferred.promise;
    },

    update: function(sql) {

        var deferred = Q.defer();

        connect().then(function(cn) {
            cn.query(sql, function(err, res) {
                if (err) throw err;
                deferred.resolve(res.changedRows);
            });
        });

        return deferred.promise;
    },

    delete: function(sql) {

        var deferred = Q.defer();

        connect().then(function(cn) {
            cn.query(sql, function(err, res) {
                if (err) throw err;
                deferred.resolve(res.affectedRows);
            });
        });

        return deferred.promise;
    }
}

module.exports = auctionDb;
