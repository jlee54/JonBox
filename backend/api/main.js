// Express
require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").Server(app);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.use(express.static("./static"));
app.use(express.json());


const createLobby = require("./routes/createLobby");
app.post("/createLobby", createLobby);

const joinLobby = require("./routes/joinLobby");
app.post("/joinLobby", joinLobby);

const configurePlayer = require("./routes/configurePlayer");
app.put("/configurePlayer", configurePlayer);

//const db = require('../db/couch');
const io = require('../socket.io/socket').init(app, http).then((socket2) => {

  // setInterval(() => {
  //   let socket = app.settings.socket;
  //   let io2 = app.settings.io;
  //   socket.to('room').emit('hello');
  //   io2.sockets.in('room').emit('hello');
  // }, 1000);
});


// socket_io.init().then((socket) => {
//   app.set("socket", socket);
//   console.log(socket);
// });

http.listen(3000, function() {
  console.log("Listening on 3000");
});
// db.getLobby('hey');
// db.get('hey', function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('cool')
//   }
// });



// main
// (async () => {
//   let res = await testing();
//   console.log(res);

//   let lobby = await createLobby();
// })()
