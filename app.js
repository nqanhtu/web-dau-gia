
require('./config/firebase');
var express = require('express');
var app = express();

require('./config')(app);
var port = process.env.PORT || 8888;
// launch ======================================================================
app.listen(port);
console.log(`Port  ${port}`);
