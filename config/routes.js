var controllers = require('../controllers/index');

module.exports = function(app, passport) {
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
   
    app.get('/user/products-auctioned', controllers.user.isLoggedIn, controllers.user.loadProductsAuctioned);
    app.post('/user/products-auctioned', controllers.user.isLoggedIn, controllers.user.getCommentSeller);

    app.get('/user/products-auctioning', controllers.user.isLoggedIn, controllers.user.loadProductsAuctioning);
    
    app.get('/user/products-selling', controllers.user.isLoggedIn, controllers.user.loadProductsSelling);

    app.get('/user/products-bought', controllers.user.isLoggedIn, controllers.user.loadProductsBought);
    app.post('/user/products-bought', controllers.user.isLoggedIn, controllers.user.getCommentBidder);

    app.get('/user/products-follows', controllers.user.isLoggedIn, controllers.user.loadProductsFollows);

    app.get('/user/detail-feedback', controllers.user.isLoggedIn, controllers.user.detailfeedback);

    app.get('/user/upgrade-account', controllers.user.isLoggedIn, controllers.user.upgradeAccountIndex);
    app.post('/user/upgrade-account', controllers.user.isLoggedIn, controllers.user.insertUpgradeAccount);

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
            if(req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
            res.redirect('/');
        });

    app.get('/product/detail/:id', controllers.product.detail);

    app.post('/product/detail/:id', controllers.user.isLoggedIn, controllers.product.bid);
    app.post('/product/detail/follow', controllers.user.isLoggedIn, controllers.product.follow);
    // Admin Page
    app.get('/admin/change-password', controllers.user.isLoggedIn, controllers.admin.changePassword);
    app.post('/admin/change-password', controllers.user.isLoggedIn, controllers.admin.updatePassword);

    app.get('/admin/user-management', controllers.user.isLoggedIn, controllers.admin.isAdmin, controllers.admin.loadUser);
    app.post('/admin/user-management', controllers.user.isLoggedIn, controllers.admin.isAdmin, controllers.admin.updatePassword);
    
    app.get('/admin/product-management', controllers.user.isLoggedIn, controllers.admin.isAdmin, controllers.admin.loadProduct);
    app.post('/admin/product-management', controllers.user.isLoggedIn, controllers.admin.isAdmin, controllers.admin.updatePassword);

    app.get('/admin/category-management', controllers.user.isLoggedIn, controllers.admin.isAdmin, controllers.admin.loadCategory);
    app.post('/admin/category-management', controllers.user.isLoggedIn, controllers.admin.isAdmin, controllers.admin.updatePassword);

    app.get('/admin/request-management', controllers.user.isLoggedIn, controllers.admin.isAdmin, controllers.admin.loadRequestUsers);
    app.post('/admin/request-management', controllers.user.isLoggedIn, controllers.admin.isAdmin, controllers.admin.AcceptUsers);
    app.post('/admin/request-management', controllers.user.isLoggedIn, controllers.admin.isAdmin, controllers.admin.updatePassword);

    app.get('/product/add', controllers.user.isLoggedIn, controllers.product.add);
    app.post('/product/add', controllers.user.isLoggedIn,controllers.product.insertProduct);
};

function redirect(user) {
    if(user.type === -1) {
        return '/admin/profile'
    }
    return '/user/profile'
};