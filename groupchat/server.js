// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
// create the express app
var app = express();
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
})



// tell the express app to listen on port 8001
var server = app.listen(8001, function() {
 console.log("listening on port 8001");
});

var io = require('socket.io').listen(server);

// Whenever a connection event happens (the connection event is built in) run the following code
var name = {};
io.sockets.on('connection', function (socket) {

  console.log(socket.id);
  socket.on("new_user", function (name){
      socket.name=name;
  // var lucky=(Math.random()*1000)
  //all the socket code goes in here!
  socket.on("textsubmitted", function (data){
      io.emit('server_message', name, {response: data});
    })
  })
})
