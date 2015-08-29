// server.js
var express = require('express');
var middleware = require('./config/middleware');
require('./config/db');

var port = process.env.PORT || 3000;

var app = express();

middleware(app);

app.listen(port);
console.log('Server now listening on port ' + port);

module.exports = app;

