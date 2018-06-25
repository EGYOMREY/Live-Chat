"use strict";

$(document).ready(function () {
	var socket = io();


	var messageForm = $("#message-form");
	var messageBox = $("#message");
	var chat = $("#chat");

	// Events
	messageForm.submit(function (e) {
		e.preventDefault();
		var messageToSend = $("<div/>").text(messageBox.val().trim()).html();
		if (messageToSend.length < 150) {
			socket.emit("Send Message", messageToSend, function (data) {
				chat.append("<p class='error'>" + data + "</p>");
			});
			messageBox.val("");
		} else {
			chat.append("<p class='error'>'Please submit a message with less than 150 characters'</p>");
		}
	});

	// nicknames
	var nickForm = $("#nickForm");
	var nickError = $("#nickError");
	var nickname = $("#nickname");

	// users
	var users = $("#usernames");

	nickForm.submit(function (e) {
		e.preventDefault();
		var nickNameToSubmit = $("<div/>").text(nickname.val().trim()).html();
		if (nickNameToSubmit.length < 10) {
			socket.emit("New User", nickNameToSubmit, function (data) {
				if (data) {
					$("#nickWrap").hide();
					$("#contentWrap").show();
				} else {
					$(".ui.error.message").show();
					nickError.html("<div class='alert alert-danger'>That username already exists</div>");
				}
				nickname.val("");
			});
		} else {
			$(".ui.error.message").show();
			nickError.html("Please use a username with less than 10 characters</div>");
		}
	});

	socket.on("New Message", function (data) {
		chat.prepend('<p class="chatMessage">' + data.nick + "</b>: " + data.msg + "<p/>");
	});

	socket.on("whisper", function (data) {
		chat.prepend("<p class='hisper chatMessage'<b>" + data.nick + ":</b> " + data.msg + "</p>");
	});

	socket.on("usernames", function (data) {
		var html = "";
		for (var i = 0; i < data.length; i++) {
			html += "<div class='ui button blue'><i class='user circle outline icon'></i> " + data[i] + "</div>";
		}
		users.html(html);
	});

	socket.on("Load old Msg", function (msgs) {
		for (var i = 0; i < msgs.length; i++) {
			displayMsg(msgs[i]);
		}
	});

	function displayMsg(data) {
		chat.prepend("<p class='chatMessage'><b>" + data.nick + ":</b> " + data.msg + "</p>");
	}

	$("#clearChat").click(function () {
		chat.html('');
	});
	$(".ui.error.message").hide();
});