var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(3000);

var clients = [];

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  clients.push(socket.id);
});

setTimeout(function(){
    io.sockets.socket(clients[0]).emit("greeting", "Howdy, User 1!");
    io.sockets.socket(clients[1]).emit("greeting", "Hey there, User 2");
}, 5000);
//
