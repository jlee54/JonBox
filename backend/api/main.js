// Express
require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").Server(app);

const server_options = {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
};

const io = require("socket.io")(http, server_options);

app.use(express.static("./static"));
const test = require("./routes/test");
const createLobby = require("./routes/createLobby");
app.get("/test", test);
app.post("/lobby", createLobby);


io.sockets.on("connection", function (socket) {
  console.log("client connected");
  socket.on("test", test);
});

http.listen(3000, function() {
  console.log("listening on 3000");
});


const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
console.log(db_username);

const nano = require("nano")
  ("http://"+db_username+":"+db_password+"@localhost:5984");

async function createDB() {
  try {
    let response = await nano.db.create("jonbox")
    console.log(response)
  } catch (e) {
    console.error(e)
  }
}

const db = nano.db.use("jonbox");

async function testing() {
  let test = await db.get("test");
  if (!test) {
    test = await db.insert({ happy: true });
  }
  return test;
}

// async function createLobby(code) {
//   return await db.insert({ code: code, lobby: true });
// }

async function getLobby(code) {
  return await db.get(code);
}

// main
// (async () => {
//   let res = await testing();
//   console.log(res);

//   let lobby = await createLobby();
// })()
