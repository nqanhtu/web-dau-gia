var models = require('../models/index');
var crypto = require('crypto');
var dateFormat = require('dateformat');

module.exports = {
  isAdmin: function (req, res, next) {
    if (req.user.type === -1)
      return next();
    res.redirect('/user/login');
  },

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
    res.render('admin/change-password', {
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
          res.redirect('/admin/change-password');
        }
      });
    }
    else {
      res.redirect('/admin/change-password');
    }
  },

  /* User Management */
  loadUser: function (req, res) {
    models.admin.loadUsers(function (users) {
      for (var i = 0; i < users.length; i ++) {
        if (users[i].type === -1) {
          users[i]['isAdmin'] = true;
        }else {
          users[i]['isAdmin'] = false;
        }
      }
      console.log(users);
      res.render('admin/user-management', {
        title: 'User Management',
        layout: 'profile',
        user: req.user,
        users: users
      });
    });
  },

  deleteUser: function (req, res) {
    res.render('admin/user-management', {
      title: 'Change Password',
      layout: 'profile',
      user: req.user
    });
  },

  resetpasswordUser: function (req, res) {
    res.render('admin/user-management', {
      title: 'Change Password',
      layout: 'profile',
      user: req.user
    });
  },

  /* Product Management */
  loadProduct: function (req, res) {
    models.admin.loadProducts(function (products) {
      console.log(products);
      res.render('admin/product-management', {
        title: 'Products Management',
        layout: 'profile',
        user: req.user,
        products: products
      });
    });
  },

  acceptProduct: function (req, res) {
    res.render('admin/product-management', {
      title: 'Change Password',
      layout: 'profile',
      user: req.user
    });
  },

  deleteProduct: function (req, res) {
    res.render('admin/product-management', {
      title: 'Change Password',
      layout: 'profile',
      user: req.user
    });
  },

  /* Category */
  loadCategory: function (req, res) {
    models.admin.loadCategory(function (categories) {
      res.render('admin/category-management', {
        title: 'Category Management',
        layout: 'profile',
        user: req.user,
        categories: categories
      });
    });
  },

  updateCategory: function (req, res) {
    res.render('admin/category-management', {
      title: 'Change Password',
      layout: 'profile',
      user: req.user
    });
  },

  /* User Request */
  loadRequestUsers: function (req, res) {
    models.admin.loadRequest(function (requests) {
      
      res.render('admin/request-management', {
        title: 'Accept Request Upgrade User',
        layout: 'profile',
        user: req.user,
        requests: requests
      });
    });
  },

  AcceptUsers: function (req, res) {
    var entity = {
      button: req.body.buttonid,
      userid: req.body.userid,
    }
    if (entity.button == 'accept') {
      models.admin.updateRequest(entity, function (effectedRows) {
        models.admin.updateTypeUser(entity, function (effectedRows){
          res.redirect('/admin/request-management')
        });
      });
    } else {
      models.admin.updateRequest(entity, function (effectedRows) {
        res.redirect('/admin/request-management');
      });
    };
  },
}