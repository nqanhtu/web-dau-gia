var path = require('path');
var wnumb = require('wnumb');
var exphbs = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');

module.exports = function(app) {
    app.set('views', path.join(__dirname, '../app/views'));

    app.engine('hbs', exphbs({
        extname: 'hbs',
        defaultLayout: 'main',
        layoutsDir: path.resolve('./app/views/layouts/'),
        partialsDir: path.resolve('./app/views/partials/'),
        helpers: {
            section: express_handlebars_sections(),
            formatCurrency: function(num) {
                return wnumb({thousand: ','}).to(num);
            }
        }
    }));

    app.set('view engine', 'hbs');
}