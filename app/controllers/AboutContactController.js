var About_Contact_Controller ={
	about: function(req, res){
		res.render('about', {
	  	title: 'Bop-Team',
			Message: 'Về Chúng Tôi',
	  	active: { about: true },
	  	user : req.user
	  })
	},
  contact: function(req, res){
		res.render('contact', {
	  	title: 'Bop-Team',
	  	active: { contact: true },
	  	user : req.user
	  })
	},

};
module.exports = About_Contact_Controller;
