var mysql = require('mysql');

var HOST = 'eu-cdbr-west-01.cleardb.com',
    DB = 'heroku_f096d1c00ffe1ff',
    USER = 'b17ec74fc26156',
    PWD = '6eb4c380',
    PORT = '3306';
var pool = mysql.createPool({
    connectionLimit: 10,
    host: HOST,
    user: USER,
    password: PWD,
    database: DB,
    port: PORT,
    migrate: 'safe',
    acquireTimeout: 100000
});

module.exports = pool;