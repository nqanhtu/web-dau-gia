var crypto = require('crypto');
var informationModel = require('../models/informationModel');

var InformationController = {
  information: function (req, res) {
    /*
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(user.email);
      } else {
        // No user is signed in.
      }
    });
    */
    console.log(req.user);
    res.render('information', {
      title: 'Profile Information',
      layout: 'infor',
      user: req.user
    })
  },

  updateInfo: function (req, res) {
    // Description of entity
    var entity = {
      full_name: req.body.name,
      address: req.body.address,
      email: req.body.email,
      oldemail: req.user.email,
    };
    informationModel.UpdateUser(entity);
    req.logout();
    res.redirect('/login')
  },

  changePassword: function (req, res) {
    res.render('change_Password', {
      title: 'Change Password',
      layout: 'infor',
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

      informationModel.UpdatePassword(entity);
    }
    else {
      res.redirect('/information');
    }
  },

  detail_feedback: function (req, res) {
    res.render('detail_feedback', {
      title: 'Detail Feedback',
      layout: 'infor',
      user: req.user // get the user out of session and pass to template
    });
  },

  list_products_auctioned: function (req, res) {
    res.render('list_products_auctioned', {
      title: 'Result auctioned',
      layout: 'infor',
      user: req.user // get the user out of session and pass to template
    });
  },


};
module.exports = InformationController;
