const express = require('express');

const app = express();

const {videoController} = require('./videoController');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/video', videoController);

app.listen(9000, function() {
    console.log(`Server started at port 9000`);
});