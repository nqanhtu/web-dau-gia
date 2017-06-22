module.exports = function(app) {
    require('./middlewares')(app);
    require('./routes')(app);
    require('./views')(app);
}