var models = require('../models/index');

module.exports = {
    detail: function (req, res) {
        res.render('./product/detail', {
            layout: 'product_detail',
            title: 'ccdsf',
            user: req.user
        });
        //models.product.loadDetail(req.params.id);
    }
}