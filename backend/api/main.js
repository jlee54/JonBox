// Express
require("dotenv").config();
global.fetch = require("node-fetch");
const express = require("express");
const app = express();
const http = require("http").Server(app);

const path = require("path");
global.base = path.dirname(path.resolve(__dirname));

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

const getLobby = require("./routes/getLobby");
app.get("/getLobby", getLobby);

const getValidTwitterAccount = require("./routes/getValidTwitterAccount");
app.get("/getValidTwitterAccount", getValidTwitterAccount);

const validateTweetStreet = require("./routes/gameConfigurations/validateTweetStreet");
app.post("/validateTweetStreet", validateTweetStreet);

const tweetStreetStartGame = require("./routes/games/tweetStreet/startGame");
app.get("/tweetStreet/startGame", tweetStreetStartGame);

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


const Twitter = require("../twitter/twitter.js");

// Twitter.getTweetsByUserId('160396614').then(tweets => {
//   console.log(tweets);
// });

// Twitter.getUserByUsername('toomuchprotein').then(user => {
//   Twitter.getTweetsByUserId(user.id).then(tweets => {
//       let tweet = tweets[0];

//       Twitter.getEmbeddedTweet(tweet.id).then(embeded_tweet => {
//         console.log(embeded_tweet);
//       });
//   })
// });

// Twitter.getEmbeddedProfile('toomuchprotein').then(data => {
//   console.log(data);
// })



// (async () => {

//   let url = "http://127.0.0.1:5000/test2";
//   let response = await fetch(url, {
//     method: "POST",
//     headers: {"Content-Type": "application/json"},
//     body: JSON.stringify({
//       username: "KyleKulinski"
//     })
//   });

//   let data = await response.json();
//   console.log(data);
// })();