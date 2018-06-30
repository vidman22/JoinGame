const express = require('express');
const app = express();
const server = require('http').Server(app);


const PORT = process.env.PORT || 5000;

// app.use(express.static(__dirname + '/../build'));


server.listen(PORT, () => {
	console.log("Connected on port " + PORT + "!");
});