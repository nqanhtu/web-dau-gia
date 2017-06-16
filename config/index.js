var routes = require('./routes');
module.exports = function (app) {
    require('./middlewares')(app);
    require('./views')(app);
    require('./routes')(app);
}