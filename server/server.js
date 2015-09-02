// server.js
var express = require('express');
var middleware = require('./config/middleware');
var models = require('./config/db');

var port = process.env.PORT || 3000;

var app = express();

app.set('models', models);

middleware(app, express);

app.listen(port);
console.log('Server now listening on port ' + port);

module.exports = app;

