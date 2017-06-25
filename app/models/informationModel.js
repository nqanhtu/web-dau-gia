var Q = require('q');
var mustache = require('mustache');
var db = require('../../app-helpers/dbHelper');

var informationModel = {

    /**
     * Update a user to database
     * entity: data to insert
     */
    UpdateUser: function(entity) {

        var deffered = Q.defer();

        var sql = mustache.render(
            'UPDATE users SET `full_name` = "{{full_name}}", `email` = "{{email}}", `address` = "{{address}}" WHERE `email` = "{{oldemail}}";',
            entity
        );

        db.insert(sql).then(function(insertId) {
            deffered.resolve(insertId);
        });

        return deffered.promise;
    },

        /**
     * Update a user to database
     * entity: data to insert
     */
    UpdatePassword: function(entity) {

        var deffered = Q.defer();

        var sql = mustache.render(
            'UPDATE users SET `password` = "{{password}}" WHERE `email` = "{{oldemail}}";',
            entity
        );

        db.insert(sql).then(function(insertId) {
            deffered.resolve(insertId);
        });

        return deffered.promise;
    },
};

module.exports = informationModel;