var mysql = require('mysql');

// var HOST = '192.168.100.6';
// var USER = 'anhvinhitus';
// var PASSWORD = '123456';
// var DATABASE = 'auction_web_db';
<<<<<<< HEAD
// var HOST = '192.168.100.6';
// var USER = 'anhvinhitus';
// var PASSWORD = '123456';
// var DATABASE = 'auction_web_db';
=======

>>>>>>> 9a27b571be32885d7cad2ab940bdcb75d1c16fac
var HOST = 'eu-cdbr-west-01.cleardb.com';
var USER = 'b17ec74fc26156';
var PASSWORD = '6eb4c380';
var DATABASE = 'heroku_f096d1c00ffe1ff';

<<<<<<< HEAD
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
=======
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
>>>>>>> 9a27b571be32885d7cad2ab940bdcb75d1c16fac
            });
        });
    },

<<<<<<< HEAD
    insert: function (query, callback) {
        pool.getConnection(function (connectError, connection) {
            if (connectError) throw connectError;
            connection.query(query, function (queryError, result, fields) {
                connection.release();
                if (queryError) throw queryError;
                callback(result.insertId);
=======
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
>>>>>>> 9a27b571be32885d7cad2ab940bdcb75d1c16fac
            });
        });
    },

<<<<<<< HEAD
    update: function (query, callback) {
        pool.getConnection(function (connectError, connection) {
            if (connectError) throw connectError;
            connection.query(query, function (queryError, result, fields) {
                connection.release();
                if (queryError) throw queryError;
                callback(result.affectedRows);
=======
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
>>>>>>> 9a27b571be32885d7cad2ab940bdcb75d1c16fac
            });
        });
    },

<<<<<<< HEAD
    delete: function (query, callback) {
        pool.getConnection(function (connectError, connection) {
            if (connectError) throw connectError;
            connection.query(query, function (queryError, result, fields) {
                connection.release();
                if (queryError) throw queryError;
                callback(result.affectedRows);

=======
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
>>>>>>> 9a27b571be32885d7cad2ab940bdcb75d1c16fac
            });
        });
    },

    passportSelect: function (query, callback) {
<<<<<<< HEAD
        pool.getConnection(function (connectError, connection) {
            if (connectError) throw connectError;
            connection.query(query, function (queryError, result, fields) {
                connection.release();
                callback(queryError, result);
=======
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
>>>>>>> 9a27b571be32885d7cad2ab940bdcb75d1c16fac
            });
        });
    },

    passportInsert: function (query, callback) {
<<<<<<< HEAD
        pool.getConnection(function (connectError, connection) {
            if (connectError) throw connectError;
            connection.query(query, function (queryError, result, fields) {
                connection.release();
                callback(queryError, result);

=======
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
>>>>>>> 9a27b571be32885d7cad2ab940bdcb75d1c16fac
            });
        });
    }
}