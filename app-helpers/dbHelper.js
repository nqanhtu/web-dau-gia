var Q = require('q');
var mysql = require('mysql');

var HOST = 'eu-cdbr-west-01.cleardb.com',
    DB = 'heroku_f096d1c00ffe1ff',
    USER = 'b17ec74fc26156',
    PWD = '6eb4c380',
    PORT = '3306';

function connect() {
    var deferred = Q.defer();

    var cn = mysql.createConnection({
        connectionLimit: 200,
        host: HOST,
        user: USER,
        password: PWD,
        database: DB,
        port: PORT,
        migrate: 'safe'
    });

    cn.connect(function (err) {
        if (err) throw err;
        deferred.resolve(cn);
    });

    return deferred.promise;
}

var auctionDb = {
    load: function (sql) {
        var deferred = Q.defer();
        connect().then(function (cn) {
            cn.query(sql, function (err, rows, fields) {
                if (err) throw err;
                cn.end();
                deferred.resolve(rows);
                cn.end({timeout:60000});
            });
        });
        return deferred.promise;
    },

    insert: function (sql) {

        var deferred = Q.defer();

        connect().then(function (cn) {
            cn.query(sql, function (err, res) {
                if (err) throw err;
                cn.end();
                deferred.resolve(res.insertId);
                cn.end({timeout:60000});
            });

        });

        return deferred.promise;
    },

    update: function (sql) {

        var deferred = Q.defer();

        connect().then(function (cn) {
            cn.query(sql, function (err, res) {
                if (err) throw err;
                cn.end();
                deferred.resolve(res.changedRows);
                cn.end({timeout:60000});
            });


        });

        return deferred.promise;
    },

    delete: function (sql) {

        var deferred = Q.defer();

        connect().then(function (cn) {
            cn.query(sql, function (err, res) {
                if (err) throw err;
                cn.end();
                deferred.resolve(res.affectedRows);
                cn.end({timeout:60000});
            });


        });
        return deferred.promise;
    }
}

module.exports = auctionDb;
