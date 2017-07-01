const PORT = process.env.PORT || 8080;

var express = require('express');
var session  = require('express-session');
var path = require('path');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHandlebars = require('express-handlebars');
var expressHandlebarsSections = require('express-handlebars-sections');
var passport = require('passport');
var flash = require('connect-flash');
var wnumb = require('wnumb');

var handle404 = require('./middlewares/handle404');


var app = express();

// Set up express application
app.use(morgan('dev'));
<<<<<<< HEAD
app.use(bodyParser.urlencoded({ extended: true }));
=======
app.use(bodyParser.urlencoded({ extended: false }));
>>>>>>> 9a27b571be32885d7cad2ab940bdcb75d1c16fac
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, './public')));

// Set up view engine
app.engine('hbs', expressHandlebars({
    extname: 'hbs',
    helpers: {
        section: expressHandlebarsSections(),
        formatCurrency: function(num) {
            return wnumb({thousand: ','}).to(num);
        }
    }
}));

app.set('view engine', 'hbs');

// required for passport
app.use(session({
    secret: 'vidyapathaisalwaysrunning',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./config/index')(app, passport);

app.use(handle404);

app.listen(PORT);