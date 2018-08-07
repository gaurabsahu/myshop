//requires
var express = require('express');
var config = require('./resources/config');
var GenerateJwtToken = require('./authentication/GenerateJwtToken');
var Authentication = require('./authentication/Authentication');
var bodyParser = require('body-parser');
var io = require('socket.io')(server);


var app = express();

// io.on('connection', function(socket){
//   console.log('a user connected');
// });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var unless = function(path, middleware) {
    return function(req, res, next) {
        if (path === req.path) {
            return next();
        } else {
            return middleware(req, res, next);
        }
    };
};

//app.use(unless('/validateCred',GenerateJwtToken.validateToken));

app.route('/validateCred').post(Authentication.authenticate);

app.route('/getDetail').get(function(req, res){

  res.send("hi Gaurab");
});

//server configuration
var server = app.listen(config.serverPort, function(req, res) {
  console.log('app started at ' + config.serverPort);
});
