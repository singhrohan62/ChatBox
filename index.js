var app = require('express')();

var http = require('http').Server(app);

var io = require('socket.io')(http);

var users = {};

var usernames = [];

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
		user_name = username;
		users[socket.id] = username;
		usernames.push(username);
		console.log('user when logged in : '+ user_name);
		console.log(users);
		io.emit('Users Connected',usernames);
	});

	socket.on('Chat Message', function (msg) {
		console.log('username passed : '+ users[socket.id]);
		console.log(users);
		console.log(socket.id);
		console.log(users[socket.id]);
		user_name = users[socket.id];
		console.log(users[socket.id]+' texts : '+msg);
		io.emit('Chat Message Show', msg, users[socket.id]);
		// io.emit('Chat Message', msg, user_name);
	});

	socket.on('disconnect',function () {
		console.log('user disconnected');
	});
});

http.listen(3000, function () {
	console.log('listening on port: 3000');
});