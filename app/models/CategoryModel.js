var pool = require('./db');

var categoryModel = {

    /**
     * Get all categories
     */
    GetCategories: function (callback) {

        var sql = 'SELECT * FROM categories;';
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(sql, function (error, results, fields) {
                connection.release();
                callback(results);
                if (error) throw error;
            });
        });

    }
};

module.exports = categoryModel;