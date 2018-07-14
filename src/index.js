const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const path = require('path');

const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

// db
mongoose.connect('mongodb://yourUser:yourPassword@ds241570.mlab.com:41570/chat-sockets')
.then(db => {
	console.log('db is connected');
})
.catch(err => {
	console.log(err);
})

//settings
app.set('port', process.env.PORT || 3000);

require('./sockets')(io);


// serve these files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
server.listen(app.get('port'), () => {
	console.log('Server Connected');
});




