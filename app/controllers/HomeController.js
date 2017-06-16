var HomeController = {
	index: function (req, res) {
		res.render('index', {
			title: 'Bop-Team',
			page: 'index',
			active: { home: true },
			user: req.user
		})
	}
};

module.exports = HomeController;
