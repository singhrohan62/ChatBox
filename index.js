var app = require('express')();

var http = require('http').Server(app);

var io = require('socket.io')(http);

var users = [];

var user_name = '';

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/login.html');
});

app.get('/chat',function (req, res) {
	res.sendFile(__dirname + '/index.html');
})

io.on('connection', function (socket) {
	console.log('connected');

	socket.on('Login User',function (username) {
		console.log(username+' connected');
		user_name = username;
		 users.push(user_name);
		 console.log(users);
		 io.emit('Users Connected',users);
	});

	socket.on('Chat Message', function (msg) {
		console.log(user_name+' texts : '+msg);
		io.emit('Chat Message', msg, user_name);
	});

	socket.on('disconnect',function () {
		console.log('user disconnected');
	});
});

http.listen(3000, function () {
	console.log('listening on port: 3000');
});