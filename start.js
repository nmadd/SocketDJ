var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function(socket){
	console.log("SOCKETS")
	// io.emit('playTheSong', {index: 0})
	socket.on('test', function(index){
		console.log('PLAYING', index);
		io.emit('test2', index)
	})
	socket.on('factory', function(hello){
		console.log('factory', hello);
		// socket.emit('playTheSong', index)
	})
})


var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('node_modules'));
app.use(express.static(__dirname + '/frontend'));
app.use(express.static(__dirname + '/sounds'));
app.use(express.static(__dirname + '/public'));

app.get('/*', function(req,res,next){
	res.status(200).sendFile(__dirname + '/index.html');
})


server.listen(2727, function(){
	console.log('Listening on port 2727');
})