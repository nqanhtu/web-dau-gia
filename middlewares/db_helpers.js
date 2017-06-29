var mysql = require('mysql');

var HOST = '192.168.100.6';
var USER = 'anhvinhitus';
var PASSWORD = '123456';
var DATABASE = 'auction_web_db';

module.exports = {
    select: function (query, callback) {
        var connection = mysql.createConnection({
            host: HOST,
            user: USER,
            password: PASSWORD,
            database: DATABASE
        });

        connection.connect(function (connectError) {
            if(connectError) throw connectError;
            connection.query(query, function (queryError, result, fields) {
                if(queryError) throw queryError;
                callback(result);
                connection.end();
            });
        });
    },

    insert: function(query, callback) {
        var connection = mysql.createConnection({
            host: HOST,
            user: USER,
            password: PASSWORD,
            database: DATABASE
        });

        connection.connect(function (connectError) {
            if(connectError) throw connectError;
            connection.query(query, function (queryError, result, fields) {
                if(queryError) throw queryError;
                callback(result.insertId);
                connection.end();  
            });
        });
    },

    update: function(query, callback) {
        var connection = mysql.createConnection({
            host: HOST,
            user: USER,
            password: PASSWORD,
            database: DATABASE
        });

        connection.connect(function (connectError) {
            if(connectError) throw connectError;
            connection.query(query, function (queryError, result, fields) {
                if(queryError) throw queryError;
                callback(result.affectedRows);
                connection.end(); 
            });
        });
    },

    delete: function(query, callback) {
        var connection = mysql.createConnection({
            host: HOST,
            user: USER,
            password: PASSWORD,
            database: DATABASE
        });

        connection.connect(function (connectError) {
            if(connectError) throw connectError;
            connection.query(query, function (queryError, result, fields) {
                if(queryError) throw queryError;
                callback(result.affectedRows);
                connection.end(); 
            });
        });
    },

    passportSelect: function (query, callback) {
        var connection = mysql.createConnection({
            host: HOST,
            user: USER,
            password: PASSWORD,
            database: DATABASE
        });

        connection.connect(function (connectError) {
            if(connectError) throw connectError;
            connection.query(query, function (queryError, result, fields) {
                callback(queryError, result);
                connection.end();
            });
        });
    },

    passportInsert: function (query, callback) {
        var connection = mysql.createConnection({
            host: HOST,
            user: USER,
            password: PASSWORD,
            database: DATABASE
        });

        connection.connect(function (connectError) {
            if(connectError) throw connectError;
            connection.query(query, function (queryError, result, fields) {
                callback(queryError, result);
                connection.end();
            });
        });
    }
}