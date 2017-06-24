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
    
    res.render('information', {
      title: 'Profile Information',
      layout: 'infor',
      active: { information: true },
      user: req.user
    })
  },
  
  shipping_address: function (req, res) {
    res.render('shipping_address', {
      title: 'Shipping Address',
      layout: 'infor',
      user: req.user // get the user out of session and pass to template
    });
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

  list_products_follows: function (req, res) {
    res.render('list_products_follows', {
      title: 'List products follows',
      layout: 'infor',
      user: req.user // get the user out of session and pass to template
    });
  },

  list_products_auction: function (req, res) {
    res.render('list_products_auction', {
      title: 'List products auction',
      layout:'infor',
      user: req.user // get the user out of session and pass to template
    });
  },

};
module.exports = InformationController;
