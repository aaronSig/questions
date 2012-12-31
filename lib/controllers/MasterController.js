var express = require('express');
var indexController = require('./IndexController');

var mobileSocketController = require('./MobileSocketController');
var displaySocketController = require('./DisplaySocketController');

var loaded = false;

exports.startup = function(){

  var app = express.createServer();
  io = require('socket.io').listen(app);

  app.set('views', __dirname + '/../Views');
  app.set('view engine', 'ejs');
  app.set("view options", { layout: false })
  app.use(express.static(__dirname + '/../../public'));
  app.use(express.cookieParser());

  //Bind all the controllers here
  indexController.bind(app);
  
  io.set('log level', 1); 
  io.sockets.on('connection', function (socket) {
    if(!loaded){
      mobileSocketController.bind(io);
      displaySocketController.bind(io);
      loaded = true;
    }
  });

  console.log("starting server on port " + (process.env.PORT || 3000));
  app.listen(process.env.PORT || 3000);
  console.log("server started " + (process.env.PORT || 3000));

}



