var Q = require('q');
var mustache = require('mustache');
var auctionDb = require('../../app-helpers/dbHelper');

var homeModel = {
    loadAllProduct: function () {

        var deffered = Q.defer();
        var sql = 'SELECT * FROM products p, images i WHERE p.ID = i.ProductID AND i.index = 1;';

        auctionDb.load(sql).then(function (rows) {
            deffered.resolve(rows);
        });

        return deffered.promise;
    },

    loadLastestBidder: function (productID) {
        var deffered = Q.defer();
        var sql = '';
        auctionDb.load(sql).then(function (rows) {
            deffered.resolve(rows);
        });

        return deffered.promise;
    }
};

module.exports = homeModel;