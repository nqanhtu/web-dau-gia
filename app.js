var express = require('express');
var app = express();

require('./config')(app);

app.listen(3000);