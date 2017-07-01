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
<<<<<<< HEAD
=======

>>>>>>> 9a27b571be32885d7cad2ab940bdcb75d1c16fac
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
<<<<<<< HEAD
  loadProductsAuctioned: function (req, res) {
    models.user.LoadProductsAutioned(req.user.id, function (products) {
      models.user.LoadAllRating(function (rating) {
        checkRatedSeller(products, rating);
        for (var i = 0; i < products.length; ++i) {
          if (products[i].bidder_id == req.user.id)
            products[i]['status'] = true;
          else
            products[i]['status'] = false;
          products[i].start_time = dateFormat(products[i].start_time, "yyyy/mm/dd hh:MM:ss");
          products[i].end_time = dateFormat(products[i].end_time, "yyyy/mm/dd hh:MM:ss");
        }
        res.render('user/products-auctioned', {
          title: 'Products auctioned',
          layout: 'profile',
          user: req.user,
          products: products,
        });
      });
    });
  },

  getCommentSeller: function (req, res) {
    var entity = {
      rated_id: req.user.id,
      rating_id: Number(req.body.sellerid),
      product_id: Number(req.body.productid),
      comment: req.body.message,
      point: Number(req.body.point),
      flag: Number(0),
    }
    console.log(entity.point);
    models.user.insertRating(entity, function (insertId) {
      var like = 0;
      var dislike = 0;

      if (Number(req.body.point) == 1)
        like = req.user.like + 1;
      else dislike = req.user.dislike + 1;

      var entity = {
        like: like,
        dislike: dislike,
        id: Number(req.body.sellerid)
      }

      models.user.updatePoint(entity, function (effectedRows) {
        if (effectedRows <= 0) {
          res.redirect('/user/products-auctioned');
        }
        else
          res.redirect('/user/products-auctioned');
=======
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
>>>>>>> 9a27b571be32885d7cad2ab940bdcb75d1c16fac
      });
    });
  },

<<<<<<< HEAD
  /*
  * 
  */
  loadProductsAuctioning: function (req, res) {
=======
  GetComment: function (req, res) {
    console.log('z');
    console.log(req.body.abc);
  },

  /*
  * 
  */
  LoadProductsAuctioning: function (req, res) {
>>>>>>> 9a27b571be32885d7cad2ab940bdcb75d1c16fac
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
<<<<<<< HEAD
  loadProductsFollows: function (req, res) {
=======
  LoadProductsFollows: function (req, res) {
>>>>>>> 9a27b571be32885d7cad2ab940bdcb75d1c16fac
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

<<<<<<< HEAD

  /* Products Selling */
  loadProductsSelling: function (req, res) {
    models.user.LoadProductsSelling(req.user.id, function (products) {
      for (var i = 0; i < products.length; ++i) {
        if (new Date(Date.now()).getTime() > products[i].end_time.getTime())
          products[i]['isExpired'] = true;
        else
          products[i]['isExpired'] = false;
        products[i].start_time = dateFormat(products[i].start_time, "yyyy/mm/dd hh:MM:ss");
        products[i].end_time = dateFormat(products[i].end_time, "yyyy/mm/dd hh:MM:ss");
      }
      console.log(products);
      res.render('user/products-selling', {
        title: 'Products Selling',
        layout: 'profile',
        user: req.user,
        products: products
      });
    })
  },

  loadProductsBought: function (req, res) {
    models.user.LoadProductsBought(req.user.id, function (products) {
      models.user.LoadAllRating(function (rating) {
        checkRatedBidder(products, rating);
        for (var i = 0; i < products.length; ++i) {
          products[i].start_time = dateFormat(products[i].start_time, "yyyy/mm/dd hh:MM:ss");
          products[i].end_time = dateFormat(products[i].end_time, "yyyy/mm/dd hh:MM:ss");
        }
        console.log(products);
        res.render('user/products-bought', {
          title: 'Products Bought',
          layout: 'profile',
          user: req.user,
          products: products
        });
      });
    });
  },

  getCommentBidder: function (req, res) {
    var entity = {
      rated_id: req.user.id,
      rating_id: Number(req.body.bidderid),
      product_id: Number(req.body.productid),
      comment: req.body.message,
      point: Number(req.body.point),
      flag: Number(1),
    }
    models.user.insertRating(entity, function (insertId) {
      var like = 0;
      var dislike = 0;

      if (Number(req.body.point) == 1)
        like = req.user.like + 1;
      else dislike = req.user.dislike + 1;

      var entity = {
        like: like,
        dislike: dislike,
        id: Number(req.body.bidderid)
      }

      models.user.updatePoint(entity, function (effectedRows) {
        if (effectedRows <= 0) {
          res.redirect('/user/products-bought');
        }
        else
          res.redirect('/user/products-bought');
      });
    });
  },
  /*
  * Detail Feedback
  */
  detailfeedback: function (req, res) {
    models.user.loadDetailFeedback(req.user.id, function (feedbacks) {
      /* Check like / dislike */
      for (var i = 0; i < feedbacks.length; i++) {
        if (feedbacks[i].point == 1)
          feedbacks[i]['isLike'] = true;
        else
          feedbacks[i]['isLike'] = false;
      }

      res.render('user/detail-feedback', {
        title: 'Detail Feedback',
        layout: 'profile',
        user: req.user,
        feedbacks: feedbacks
      });
    });
  },

  /* Upgrade Account: */
  upgradeAccountIndex: function (req, res) {
    models.user.checkUpgrage(req.user.id, function (users_upgrade) {
      console.log(users_upgrade);
      if (users_upgrade.length) {
        req.user['isUpgrade'] = true;
      } else {
        req.user['isUpgrade'] = false;
      };
      console.log(req.user['isUpgrade']);
      res.render('user/upgrade-account', {
        title: 'Upgrade Account',
        layout: 'profile',
        user: req.user,
      });
    });
  },

  insertUpgradeAccount: function (req, res) {
    var entity = {
      user_id: req.user.id,
      message: req.body.message_text
    }
    console.log(entity);
    models.user.sendRequesUpgrade(entity, function (effectedRows) {
      res.redirect('/user/upgrade-account');
    });
  },
};


function checkRatedSeller(products, rating) {
  for (var i = 0; i < rating.length; ++i) {
    for (var j = 0; j < products.length; ++j) {
      if ((products[j].product_id === rating[i].product_id) && (products[j].bidder_id === rating[i].rated_id) && (products[j].seller_id === rating[i].rating_id)) {
        products[j]['isRating'] = true;
        break;
      }
      else {
        products[j]['isRating'] = false;
      }
    }
  }
}

function checkRatedBidder(products, rating) {
  for (var i = 0; i < products.length; ++i) {
    for (var j = 0; j < rating.length; ++j) {
      if ((products[i].product_id === rating[j].product_id) && (products[i].seller_id === rating[j].rated_id) && (products[i].bidder_id === rating[j].rating_id)) {
        products[i]['isRating'] = true;
        break;
      }
      else {
        products[i]['isRating'] = false;
      }
    }
  }
}

=======
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
>>>>>>> 9a27b571be32885d7cad2ab940bdcb75d1c16fac
