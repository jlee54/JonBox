const db = require("../../db");

module.exports = async (req, res) => {
    let lobby_code = req.query.lobbyCode;
    let q = {
        selector: {
            code: { "$eq": lobby_code }
        },
        fields: ["id"],
        limit: 1
    };
    let lobby_exists = (await db.find(q)).docs.length ? true : false;

    if (!lobby_exists) {
        return res.send({
            error: "Lobby not found"
        });
    }

    q = {
        selector: {
            lobby_code: { "$eq": lobby_code },
            type: { "$eq": "Player"},
        },
        fields: ["id", "name"],
    };
    let response = {
        "players": (await db.find(q)).docs,
    }
    
    res.send(response);
};
