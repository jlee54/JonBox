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

    let player_data = {
        lobby_id: lobby_response.id,
        lobby_code: code,
        type: "Player",
        leader: true
    };
    let player_response = await db.insert(player_data);

    let response = {
        "code": code,
        "playerId": player_response.id,
    };

    res.send(response);
};
