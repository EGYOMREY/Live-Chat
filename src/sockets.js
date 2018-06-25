const Chat = require('./models/chat');

module.exports = function(io) {

	let users = {};


	io.on("connection", async socket => {
		console.log("New User connected");

		let messages = await Chat.find({}).limit(5);
		socket.emit('Load old Msg', messages);

	socket.on('New User', (data, cb) => {
			if (data in users) {
			cb(false);
		} else {
			cb(true);
			socket.nickname = data;
			users[socket.nickname] = socket;
			updateNicknames()
		}
	})

	socket.on('Send Message', async (data, cb) => {
		var msg = data.trim();

		if (msg.substr(0,3) === '/w ') {
			msg = msg.substr(3);
			const index = msg.indexOf(' ');
			if (index !== -1) {
				var name = msg.substring(0, index);
				var msg = msg.substring(index + 1);
				if (name in users) {
					users[name].emit('whisper', {
						msg,
						nick: socket.nickname
					});
					users[socket.nickname].emit('whisper', {
						msg,
						nick: 'Me'
					});
				} else {
					cb("Error! This user doesn\'t exist");
				}
			} else {
				cb("Error! Plese enter your message");
			}
		} else {
			var newMsg = new Chat({
				msg,
				nick: socket.nickname
			});
			await newMsg.save();

			io.sockets.emit('New Message', {
			msg: data,
			nick: socket.nickname
		});
		}
		
	});

	socket.on('disconnect', (data) => {
		if(!socket.nickname) return;
		delete users[socket.nickname];
		updateNicknames()
	});

	function updateNicknames() {
		io.sockets.emit('usernames', Object.keys(users));
	}

	});


};
