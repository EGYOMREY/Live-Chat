# Live-Chat (FullStack)
[Live-Chat](https://fullstack-chat.herokuapp.com/) is a chat which lets you communicate with other users using a Nickname by sending general or direct messages. The messages are stored and retrieved from MongoDB (mLab), the server is built with Express and Node.js. The styling was done with Semantic-UI.

[Try it!](https://fullstack-chat.herokuapp.com/)

## Screenshots
 ![image](https://i.imgur.com/prEHuyY.png)
 
 ![image](https://i.imgur.com/jj9lZ4l.png)

# Motivation
The motivation for this project was to learn about real-time event-based communication with socket.io, and also practice the usage of the MEAN stack (even though Angular wasn't used in the UI because this project is too simple).

# Project structure
Inside the `src` folder you can find:
* `index.js`: file which contains the server setup with Node.js, Express and the connection to MongoDB (mlab)
* `sockets.js`: file which holds the logic for socket.io -> the event-based communication
* `models`: folder which contains the Schema used for MongoDB
* `public`: folder with the html, css and js

# Project requirements

### Node.js
You need Node to run this project, you can get it by downloading it from [Nodejs.org](https://nodejs.org/en/)

## Installation
To run this project, you have to clone it and install all the dependencies used.

    $ git clone https://github.com/EGYOMREY/Live-Chat.git
    $ cd Live-Chat
    $ npm install

## Usage
To run the project locally, write this command in your CL

    $ npm start

Tip: since I used MongoDB as a database (mlab), and if you want the chat to work properly you should create an [mlab account](https://mlab.com/welcome/), a db and insert your credentials in the `index.js` file, in `line 13`.

## Languages & Tools

### Javascript, MongoDB as database, Express and Node.js to build the web server

### Styling
Used [Semantic-UI](https://semantic-ui.com/) to add styling
