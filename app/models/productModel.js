var Q = require('q');
var mustache = require('mustache');

var auctionDb = require('../../app-helpers/dbHelper');

var productModel = {
    loadAllProduct: function () {

        var deffered = Q.defer();
        var sql = 'select * from products, images where ProductID = ID and `Index` = 1;';

        auctionDb.load(sql).then(function (rows) {
            deffered.resolve(rows);
        });

        return deffered.promise;
    },

    loadLastestBidder: function () {
        var deffered = Q.defer();
        var sql = 'select ProductID, count(*) as Bids from bids group by ProductID';

        auctionDb.load(sql).then(function (rows) {
            deffered.resolve(rows);
        });

        return deffered.promise;
    },

    addAProductWithImages: function (entity) {
        var deffered = Q.defer();
        var sql = mustache.render(
            'insert into products(Name, StartPrice, StepPrice, StartTime, FinishTime, Type, Seller) values (\'{{name}}\', {{startPrice}}, 10000, now(), date_add(now(), interval 3 day), {{type}}, {{seller}});',
            entity
        );

        auctionDb.insert(sql).then(function (insertId) {
            deffered.resolve(insertId);
            entity["insertId"] = insertId;
            var insertImagesSql = mustache.render(
                'insert into images(ProductID, `Index`, ThumbnailUrl, ImageUrl) values ({{insertId}}, 1, \'{{{mainThumbnail}}}\', \'{{{mainImage}}}\'),\
                ({{insertId}}, 2, \'{{{thumbnail1}}}\', \'{{{image1}}}\'), ({{insertId}}, 3, \'{{{thumbnail2}}}\', \'{{{image2}}}\');',
                entity
            );

            auctionDb.insert(insertImagesSql).then(function (insertId) {
                deffered.resolve(insertId);
            });
        });

        return deffered.promise;
    }
};

module.exports = productModel;