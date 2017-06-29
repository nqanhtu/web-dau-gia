var controllers = require('../controllers/index');


module.exports = function (app, passport) {
    // Home page
    app.get('/', controllers.home.index);
    app.get('/all-products', controllers.home.allProducts);
    app.get('/others', controllers.home.others);
    app.get('/technology', controllers.home.technology);
    app.get('/fashion', controllers.home.fashion);
    app.get('/houseware', controllers.home.houseware);

    // User page

    app.get('/user/logout', controllers.user.logout);
    app.get('/user/profile', controllers.user.isLoggedIn, controllers.user.profile);
    app.post('/user/profile', controllers.user.isLoggedIn, controllers.user.updateInformation);

    app.get('/user/change-password', controllers.user.isLoggedIn, controllers.user.changePassword);
    app.post('/user/change-password', controllers.user.isLoggedIn, controllers.user.updatePassword);

    app.get('/user/products-auctioned', controllers.user.isLoggedIn, controllers.user.LoadProductsAuctioned);

    app.get('/user/products-auctioning', controllers.user.isLoggedIn, controllers.user.LoadProductsAuctioning);

    app.get('/user/products-follows', controllers.user.isLoggedIn, controllers.user.LoadProductsFollows);

    app.get('/user/register', controllers.user.register);
    app.post('/user/register', passport.authenticate('local-register', {
        successRedirect: '/user/profile',
        failureRedirect: '/user/register',
        failureFlash: true
    }));

    app.get('/user/login', controllers.user.login);
    app.post('/user/login', passport.authenticate('local-login', {
        successRedirect: '/user/profile',
        failureRedirect: '/user/login',
        failureFlash: true
    }),
        function (req, res) {
            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
            res.redirect('/');
        });

    app.get('/product/detail/:id', controllers.product.detail);


};

function redirect(user) {
    if (user.type === -1) {
        return '/admin/profile'
    }
    return '/user/profile'
};