var controllers = require('../app/controllers');

module.exports = function(app) {
    /**
     * register page route
     */
    app.get('/register', controllers.register.index);

    /**
     * add a client to database
     */
    app.post('/register', controllers.register.addClient);

    app.get('/', controllers.home.index);
};
