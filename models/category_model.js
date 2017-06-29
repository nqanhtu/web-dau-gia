database = require('../middlewares/db_helpers');

module.exports = {
    loadCategories: function(callback) {
        var query = 'SELECT * FROM categories';
        database.select(query, function (categories) {
            callback(categories);
        });
    }
}