//SetUp
var express = require('express');
var app = express();

//Middleware Config
app.use(express.static(__dirname));

//Routes
// require('./app/assets/js/routes.js')(app)

//Listener
var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Knockout app listening at http://http://localhost:%s:%s', host, port);
});
