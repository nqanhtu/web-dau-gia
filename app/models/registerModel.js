var Q = require('q');
var mustache = require('mustache');
var db = require('../../app-helpers/dbHelper');

var registerModel = {

    /**
     * Insert a user to database
     * entity: data to insert
     */
    AddUser: function(entity) {

        var deffered = Q.defer();

        var sql = mustache.render(
            'INSERT INTO users (`full_name`, `email`, `address`, `password`) VALUES ("{{full_name}}", "{{email}}", "{{address}}", "{{password}}");',
            entity
        );

        db.insert(sql).then(function(insertId) {
            deffered.resolve(insertId);
        });

        return deffered.promise;
    },
};

module.exports = registerModel;