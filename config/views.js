var path = require('path');
var exphbs = require('express-handlebars');

module.exports = function (app) {
    // View Engine
    app.set('views', path.join(__dirname, '../app/views'));
    app.engine('hbs', exphbs({
        layoutsDir: 'app/views/layouts',
        partialsDir: 'app/views/partials',
        defaultLayout: 'layout.hbs',
        extname: '.hbs'
    }));
    app.set('view engine', 'hbs');

}