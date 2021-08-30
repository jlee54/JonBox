const db = require("../../db");

module.exports = async (req, res) => {
    let player_id = req.body.playerId;
    let lobby_code = req.body.lobbyCode;
    let player_name = req.body.playerName;

    let q = {
        selector: {
            code: { "$eq": lobby_code },
            name: { "$eq": player_name},
            type: { "$eq": "Player"},
        },
        fields: ["id"],
    };
    let player_count = (await db.find(q)).docs.length
    if (player_count > 0) {
        return res.send({
            error: "This player name has already been chosen"
        });
    }

    let headers = await db.head(player_id);
    let rev = headers.etag;
    rev = rev.slice(1, -1);

    let player_data = {
        _id: player_id,
        _rev: rev,
        code: lobby_code,
        name: player_name,
        type: "Player"
    };

    await db.insert(player_data);

    let socket = req.app.get("socket");
    socket.join(lobby_code);
    socket.to(lobby_code).emit("player configured", player_data);

    res.send(player_data);
};
