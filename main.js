//SetUp
var express = require('express');
var app = express();
var favicon = require('serve-favicon');

//Middleware Config
app.use(express.static(__dirname + '/app'));
app.use(favicon(__dirname + '/app/favicon.ico'));

//Routes
// require('./app/assets/js/routes.js')(app)

//Listener
var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Knockout app listening at http://http://localhost:%s:%s', host, port);
});
