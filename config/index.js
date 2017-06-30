module.exports = function (app, passport) {
    require('./routes')(app, passport);
    require('./passport')(passport);
};