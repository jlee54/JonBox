

//Pass config port to main class
// global.express_config = {
//   "port": 5002
// };
// const app = require('../api/main.js');
var express = require('express');
var app = express();
global.fetch = require("node-fetch");

// const express = require("express");
// const app = express();
// const http = require("http").Server(app);

// const path = require("path");
// global.base = path.dirname(path.resolve(__dirname));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//   next();
// });

// app.use(express.static("./static"));
// app.use(express.json());

// const tweetStreetStartGame = require("../api/routes/games/tweetStreet/startGame");
// app.get("/tweetStreet/startGame", tweetStreetStartGame);

// http.listen(5001, function() {
//   console.log("Listening on 5001");
// });

test("GET /tweetStreet/startGame", async () => {
  //const post = await Post.create({ title: "Post 1", content: "Lorem ipsum" });

	// //http://localhost:3000/tweetStreet/startGame?
 //  await request.get("/tweetStreet/startGame")
 //    .query({lobbyCode: "aEZB1"})
 //    .expect(200)
 //    .then((response) => {
 //      // Check type and length
 //      // expect(Array.isArray(response.body)).toBeTruthy();
 //      // expect(response.body.length).toEqual(1);

 //      // // Check data
 //      // expect(response.body[0]._id).toBe(post.id);
 //      // expect(response.body[0].title).toBe(post.title);
 //      // expect(response.body[0].content).toBe(post.content);
 //      console.log(response);
 //    });

    let params = new URLSearchParams({
      lobbyCode: "aEZB1"
    });
    let response = await fetch("http://localhost:3000/getLobby?" + params, {
      method: "GET",
      jsonheaders: {"Content-Type": "application/json"},
    });

    response = await response.json();
    expect(response.)
    
});