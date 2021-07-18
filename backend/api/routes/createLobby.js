const db = require("../../db");
const nanoid = require("nanoid");

module.exports = async (req, res) => {
    let prev_lobby = 0;
    let code;
    do {
        code = nanoid.nanoid(5);
        let q = {
            selector: {
                code: { "$eq": code }
            },
            fields: ["id"],
            limit: 1
        };
        prev_lobby = (await db.find(q)).docs.length ? 1 : 0;
    } while (prev_lobby);

    let lobby_data = {
        code: code,
        type: "Lobby"
    };

    let lobby_response = await db.insert(lobby_data);
    // let socket_io = require('../../socket.io/socket')(req, req.http);

    // socket_io.init().then((socket) => {
    //     console.log(socket);
    //     socket.join(code);
    // });
    // console.log(req.socket);
    // var io = req.app.get('socketio');
    // io.join('hi!');
    let socket = req.app.get("socket");
    socket.join(code);
    socket.to(code).emit("socket lobby created");

    let player_data = {
        lobby_id: lobby_response.id,
        lobby_code: code,
        type: "Player",
        leader: true
    };
    await db.insert(player_data);

    res.send(lobby_data);
};
