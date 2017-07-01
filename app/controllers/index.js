module.exports = {
    register: require('./RegisterController'),
    home: require('./homeController'),
    product: require('./ProductController'),
    information: require('./InformationController'),
    login: require('./LoginController'),
    productsfollowing: require('./list_products_followingController'),
    productsauctioning: require('./products_auctioningController'),
    productsauctioned: require('./products_auctionedController'),
};