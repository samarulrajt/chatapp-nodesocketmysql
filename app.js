// Startup Express App
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
http.listen(process.env.PORT || 3000);

var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'bottle'
});
connection.connect();


// Configure Ejs template engine
var path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// handle HTTP GET request to the "/" URL
app.get('/', function(req, res) {
	
	connection.query('SELECT * FROM  chat ORDER BY chat_id DESC', function(err, rows, fields) {
		if (err)
			throw err;

		// Pass the message list to the view
		res.render('index', {
			messages : rows
		});

	});
	
});

// socket.io listen for messages
io.on('connection', function(socket) {
	// When a message is received, broadcast it 
	// to all users except the originating client
	socket.on('msg', function(data) {
		
		obj = {};
		obj.msg = data.msg;
		obj.when = new Date().toString().substr(0, 24);
		obj.nickname = data.nickname;
		
		var query = connection.query('INSERT INTO chat SET ?', obj, function(err, result) {
			//console.log(result);
		});
		
		//console.log(query.sql);
		  
		socket.broadcast.emit('msg', data);
	});

	// When a user joins the chat, send a notice
	// to all users except the originating client
	socket.on('join', function(nickname) {
		// Attach the user's nickname to the socket
		socket.nickname = nickname;
		socket.broadcast.emit('notice', nickname + ' has joined the chat.');
	});

	// When a user disconnects, send a notice
	// to all users except the originating client
	socket.on('disconnect', function() {
		socket.broadcast
				.emit('notice', socket.nickname + ' has left the chat.');
	});
	
});
