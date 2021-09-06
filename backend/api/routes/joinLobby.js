const db = require("../../db");

module.exports = async (req, res) => {
    let lobby_code = req.body.lobbyCode;
    let q = {
        selector: {
            code: { "$eq": lobby_code }
        },
        fields: ["id"],
        limit: 1
    };
    let lobby_exists = (await db.find(q)).docs.length ? true : false;

    if (!lobby_exists) {
        res.send({
            error: "Lobby not found"
        });
    } else {
        let q = {
            selector: {
                code: { "$eq": lobby_code },
                type: { "$eq": "Player"},
            },
            fields: ["id", "name"],
        };
        let player_count = (await db.find(q)).docs.length
        let max_player_count = 8
        if (player_count >= max_player_count) {
            return res.send({
                error: "Max player count " + max_player_count + " has already been reached"
            });
        }

        let player_data = {
            lobby_code: lobby_code,
            type: "Player"
        };

        let player_response = await db.insert(player_data);

        let socket = req.app.get("socket");
        socket.to(lobby_code).emit("player joined");

        res.send(player_response);
    }
};
