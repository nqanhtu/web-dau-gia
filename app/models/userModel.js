var Q = require('q');
var db = require('../../app-helpers/dbHelper');

module.exports = {

    getUserByEmail: function (email) {
        var deffered = Q.defer();
        var sql = 'select * from users where email = ' + '\'' + email + '\'';

        db.load(sql).then(function (rows) {
            deffered.resolve(rows[0]);
        });
        
        return deffered.promise;
    },

    getUserByID: function (id, callback) {
        var deffered = Q.defer();
        var sql = 'select * from users where id = ' + id;

        db.load(sql).then(function (rows) {
            deffered.resolve(rows[0]);
        });

        return deffered.promise;
    },

    /**
     * Le Minh Tu
     * Get information of all users
     */
    GetAllUsers: function () {
        var deffered = Q.defer();
        var sql = 'SELECT id, full_name FROM users WHERE admin = 0;'

        db.load(sql).then(function (rows) {
            deffered.resolve(rows);
        });

        return deffered.promise;
    }
};