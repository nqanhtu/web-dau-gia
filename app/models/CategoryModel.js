var Q = require('q');
var db = require('../../app-helpers/dbHelper');

var categoryModel = {

    /**
     * Get all categories
     */
     GetCategories: function () {

        var deffered = Q.defer();
        var sql = 'SELECT * FROM categories;';

        db.load(sql).then(function (rows) {
            deffered.resolve(rows);
        });

        return deffered.promise;
     }
};

module.exports = categoryModel;