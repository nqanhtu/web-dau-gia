var models = require('../models/index');
var crypto = require('crypto');
var dateFormat = require('dateformat');

module.exports = {
  login: function (req, res) {
    res.render('user/login', {
      layout: false,
      title: 'Login',
      message: req.flash('loginMessage')
    });
  },

  logout: function (req, res) {
    req.session.destroy(function (err) {
      if (err) throw err;
      res.redirect('/');
    });
  },

  register: function (req, res) {
    res.render('user/register', {
      layout: false,
      title: 'Register',
      message: req.flash('registerMessage')
    });
  },

  profile: function (req, res) {
    if (req.user.type === -1) {
      res.render('admin/profile', {
        layout: 'profile',
        user: req.user,
        title: 'Profile'
      });
    } else {
      res.render('user/profile', {
        layout: 'profile',
        user: req.user,
        title: 'Profile'
      });
    }
  },

  isLoggedIn: function (req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/user/login');
  },

  /* 
  * Update Information:
  */

  updateInformation: function (req, res) {
    // Description of entity
    var entity = {
      full_name: req.body.name,
      address: req.body.address,
      email: req.body.email,
      oldemail: req.user.email,
    };
    models.user.updateInformation(entity, function (effectedRows) {
      if (effectedRows > 0) {
        req.logout();
        res.redirect('/user/login')
      } else {
        res.redirect('/user/profile')
      }
    });

  },

  /* 
  * Change Password
  */
  changePassword: function (req, res) {
    res.render('user/change-password', {
      title: 'Change Password',
      layout: 'profile',
      user: req.user // get the user out of session and pass to template
    });
  },

  updatePassword: function (req, res) {
    var encryptedOldPassword = crypto.createHash('md5').update(req.body.password).digest('hex');
    if (encryptedOldPassword === req.user.password) {
      var encryptedPassword = crypto.createHash('md5').update(req.body.newpassword).digest('hex');
      // Description of entity
      var entity = {
        password: encryptedPassword,
        oldemail: req.user.email,
      };
      models.user.updatePassword(entity, function (effectedRows) {
        if (effectedRows > 0) {
          req.logout();
          res.redirect('/user/login');
        }
        else {
          res.redirect('/user/change-password');
        }
      });
    }
    else {
      res.redirect('/user/change-password');
    }
  },

  /* 
  * Product Auctioned
  */
  LoadProductsAuctioned: function (req, res) {
    models.user.LoadProductsAutioned(req.user.id, function (products) {

      for (var i = 0; i < products.length; ++i) {
        if (products[i].bidder_id == req.user.id)
          products[i]['status'] = true;
        else
          products[i]['status'] = false;
        products[i].start_time = dateFormat(products[i].start_time, "yyyy/mm/dd hh:MM:ss");
        products[i].end_time = dateFormat(products[i].end_time, "yyyy/mm/dd hh:MM:ss");
      }
      console.log(products);
      res.render('user/products-auctioned', {
        title: 'Products auctioned',
        layout: 'profile',
        user: req.user,
        products: products,
      });
    });
  },

  GetComment: function (req, res) {
    console.log('z');
    console.log(req.body.abc);
  },

  /*
  * 
  */
  LoadProductsAuctioning: function (req, res) {
    models.user.LoadProductsAuctioning(req.user.id, function (products) {

      for (var i = 0; i < products.length; ++i) {
        /* Check user */
        if (products[i].bidder_id == req.user.id)
          products[i]['isOwner'] = true;
        else
          products[i]['isOwner'] = false;
        /* Format time */
        products[i].start_time = dateFormat(products[i].start_time, "yyyy/mm/dd hh:MM:ss");
        products[i].end_time = dateFormat(products[i].end_time, "yyyy/mm/dd hh:MM:ss");
      }

      console.log(products);
      res.render('user/products-auctioning', {
        title: 'Products auctioning',
        layout: 'profile',
        user: req.user,
        products: products,
      });
    });
  },

  /* 
  * Products Follows
  */
  LoadProductsFollows: function (req, res) {
    models.user.LoadProductsFollows(req.user.id, function (products) {

      for (var i = 0; i < products.length; ++i) {
        if (new Date(Date.now()).getTime() > products[i].end_time.getTime())
          products[i]['isExpired'] = true;
        else
          products[i]['isExpired'] = false;
        products[i].start_time = dateFormat(products[i].start_time, "yyyy/mm/dd hh:MM:ss");
        products[i].end_time = dateFormat(products[i].end_time, "yyyy/mm/dd hh:MM:ss");
      }
      res.render('user/products-follows', {
        title: 'Products follows',
        layout: 'profile',
        user: req.user,
        products: products,
      });
    });
  },

  /*
  * Detail Feedback
  */
  detail_feedback: function (req, res) {
    res.render('detail_feedback', {
      title: 'Detail Feedback',
      layout: 'profile',
      user: req.user // get the user out of session and pass to template
    });
  },
};