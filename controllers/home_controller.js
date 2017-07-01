var models = require('../models/index');
var dateFormat = require('dateformat');

module.exports = {
    // Render index page
    index: function (req, res) {
        // Callback hell
        models.category.loadCategories(function (categories) {
            models.product.loadTop4MostBidded(function (top4MostBiddedProducts) {
                models.product.loadTop4NearEnd(function (top4MostNearEndProducts) {
                    models.product.loadTop4HighestPrice(function (top4MostHighestPriceProducts) {
                        models.product.loadLastestBidderAndPrice(function (lastestBidderAndPrice) {

                            processData(top4MostBiddedProducts,
                                top4MostNearEndProducts,
                                top4MostHighestPriceProducts,
                                lastestBidderAndPrice);

                            renderCategoryUrl(categories);

                            res.render('index', {
                                layout: 'home',
                                title: 'Auction',
                                categories: categories,
                                top4MostBiddedProducts: top4MostBiddedProducts,
                                top4MostNearEndProducts: top4MostNearEndProducts,
                                top4MostHighestPriceProducts: top4MostHighestPriceProducts,
                                user: req.user
                            });
                        });
                    });
                });
            });
        });
    },

    allProducts: function (req, res) {
        models.category.loadCategories(function (categories) {
            models.product.loadAllProducts(function (products) {
                models.product.loadLastestBidderAndPrice(function (lastestBidderAndPrice) {
                    encryptFullName(lastestBidderAndPrice);
                    addBlankDataToProducts(products);
                    updateDataOfProducts(products, lastestBidderAndPrice);
                    renderCategoryUrl(categories);
                    res.render('./categories/all_products', {
                        layout: 'home',
                        categories: categories,
                        products: products,
                        title: 'All products'
                    });
                });
            });
        });
    },

    others: function (req, res) {
        models.category.loadCategories(function (categories) {
            models.product.loadOthersProducts(function (products) {
                models.product.loadLastestBidderAndPrice(function (lastestBidderAndPrice) {
                    encryptFullName(lastestBidderAndPrice);
                    addBlankDataToProducts(products);
                    updateDataOfProducts(products, lastestBidderAndPrice);
                    renderCategoryUrl(categories);

                    res.render('./categories/others', {
                        layout: 'home',
                        categories: categories,
                        products: products,
                        title: 'Others'
                    });
                });
            });
        });
    },

    fashion: function (req, res) {
        models.category.loadCategories(function (categories) {
            models.product.loadFashionProducts(function (products) {
                models.product.loadLastestBidderAndPrice(function (lastestBidderAndPrice) {
                    encryptFullName(lastestBidderAndPrice);
                    addBlankDataToProducts(products);
                    updateDataOfProducts(products, lastestBidderAndPrice);
                    renderCategoryUrl(categories);

                    res.render('./categories/fashion', {
                        layout: 'home',
                        categories: categories,
                        products: products,
                        title: 'Fashion'
                    });
                });
            });
        });
    },

    technology: function (req, res) {
        models.category.loadCategories(function (categories) {
            models.product.loadTechnologyProducts(function (products) {
                models.product.loadLastestBidderAndPrice(function (lastestBidderAndPrice) {
                    encryptFullName(lastestBidderAndPrice);
                    addBlankDataToProducts(products);
                    updateDataOfProducts(products, lastestBidderAndPrice);
                    renderCategoryUrl(categories);

                    res.render('./categories/technology', {
                        layout: 'home',
                        categories: categories,
                        products: products,
                        title: 'Technology'
                    });
                });
            });
        });
    },

    houseware: function (req, res) {
        models.category.loadCategories(function (categories) {
            models.product.loadHousewareProducts(function (products) {
                models.product.loadLastestBidderAndPrice(function (lastestBidderAndPrice) {
                    encryptFullName(lastestBidderAndPrice);
                    addBlankDataToProducts(products);
                    updateDataOfProducts(products, lastestBidderAndPrice);
                    renderCategoryUrl(categories);

                    res.render('./categories/houseware', {
                        layout: 'home',
                        categories: categories,
                        products: products,
                        title: 'Houseware'
                    });
                });
            });
        });
    },
};

function renderCategoryUrl(categories) {
    for (var i = 0; i < categories.length; i++) {
        var url = categories[i].name;
        categories[i]['url'] = url.toLowerCase().split(' ').join('-');
    }
}

function addBlankDataToProducts(products) {
    for (var i = 0; i < products.length; i++) {
        products[i]['lastest_bidder'] = 'NOT BID YET';
        products[i]['lastest_price'] = products[i].start_price;
        products[i]['number_bids'] = 0;
        products[i].end_time = dateFormat(products[i].end_time, "yyyy/mm/dd HH:MM:ss");
    }
}

function updateDataOfProducts(products, data) {
    for(var i = 0; i < data.length; i++) {
        for (var j = 0; j < products.length; j++) {
            if(data[i].product_id === products[j].product_id) {
                products[j].lastest_bidder = data[i].full_name;
                products[j].number_bids = data[i].number_bids;
                products[j].lastest_price = data[i].bidded_price;
            }
        }
    }
}

function encryptFullName (data) {
    for(var i = 0; i < data.length; i++)
        for(var j = 0; j < data[i].full_name.length; j++)
            if(j % 2 === 0)
                data[i].full_name = data[i].full_name.substring(0, j - 1)
                + '*' + data[i].full_name.substring(j, data[i].full_name.length);
}

function processData(p1, p2, p3, data) {
    encryptFullName(data);
    addBlankDataToProducts(p1);
    addBlankDataToProducts(p2);
    addBlankDataToProducts(p3);
    updateDataOfProducts(p1, data);
    updateDataOfProducts(p2, data);
    updateDataOfProducts(p3, data);
}