// Express
const express = require('express');
const app = express();
const http = require("http").Server(app);

const server_options = {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
};

const io = require("socket.io")(http, server_options);

app.use(express.static('./static'));
const test = require('./routes/test');
app.get('/test', test);

io.sockets.on("connection", function (socket) {
    console.log('client connected');
    socket.on("test", test);
});

http.listen(3000, function() {
    console.log('listening on 3000');
});