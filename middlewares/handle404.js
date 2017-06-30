module.exports = function (req, res, next) {
    if (req.accepts('html') && res.status(404)) {
        res.render('error/404');
    }
}