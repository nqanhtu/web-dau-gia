var Q = require('q');
var mustache = require('mustache');

var auctionDb = require('../../app-helpers/dbHelper');

var registerModel = {
    insert: function(entity) {

        var deffered = Q.defer();

        var sql = mustache.render(
            'INSERT INTO `clients`(`FullName`,`Address`,`Email`,`Password`) VALUES ("{{name}}", "{{address}}", "{{email}}", "{{password}}")',
            entity
        );

        auctionDb.insert(sql).then(function(insertId) {
            deffered.resolve(insertId);
        });

        return deffered.promise;
    },
};

module.exports = registerModel;