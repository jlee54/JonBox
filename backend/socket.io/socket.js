// exports = module.exports = function(app, http) {

//   const server_options = {
//     cors: {
//       origin: "*",
//       methods: ["GET", "POST"]
//     }
//   };

//   const io = require("socket.io")(http, server_options);
//   const test = require("../api/routes/test");
//   app.get("/test", test);

//   function init() {
//     return new Promise((acc, rej) => {
//       io.sockets.on("connection", function (socket) {
//         console.log("Client Connected");
//         socket.on("test", test);
//         acc(socket);
//       });
//     });
//   }

//   return {init};

// }


const server_options = {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
};


module.exports.init = function(app, http){
    let io = require("socket.io")(http, server_options);
    //console.log(socketio);
    // let io = socketio.listen(app)

    // users = io.of('/users')
    // users.on('connection', function(socket){
    //     socket.on ...
    // })

    const test = require("../api/routes/test");
    app.get("/test", test);

    return new Promise((acc, rej) => {
      io.sockets.on("connection", function (socket) {
        console.log("Client Connected");
        // console.log(socket);
        socket.on("test", test);

          // let socket2 = app.get("socket");
        // socket2.join("hey");
        // setInterval(() => {
        //   // socket.broadcast.emit("hello");
        //   // socket.emit("hello");
        //   socket.join('room');
        //   //socket.to('room').emit('hello');
        //   // io.sockets.in('room').emit("hello");

        //   //console.log('emitting hello');
        // }, 1000);
        socket.on("room", function(room) {
          socket.join("room");
          //     socket.to('room').emit('hello');
          // console.log("room connected");
          // app.set("socket", socket);
          // app.set("io", io);
          // io.sockets.in(room).emit('hello');


        });

        app.set("socket", socket);
        app.set("io", io);
        acc(socket);
      });
    });
}