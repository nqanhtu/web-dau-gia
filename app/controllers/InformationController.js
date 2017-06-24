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
    //console.log(req.user);
    res.render('information', {
      title: 'Bop-Team',
      layout: 'infor',
      active: { information: true },
      user: req.user
    })
  },
  
  shipping_address: function (req, res) {
    res.render('shipping_address', {
      user: req.user // get the user out of session and pass to template
    });
  },

  list_products_auctioned: function (req, res) {
    res.render('list_products_auctioned', {
      user: req.user // get the user out of session and pass to template
    });
  },

  list_products_follows: function (req, res) {
    res.render('list_products_follows', {
      user: req.user // get the user out of session and pass to template
    });
  },

  list_products_auction: function (req, res) {
    res.render('list_products_auction', {
      user: req.user // get the user out of session and pass to template
    });
  },

};
module.exports = InformationController;
