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
                code: { "$eq": lobby_code }
                type: {" $eq": "Player"}
            },
            fields: ["id", "name"],
        };
        let players = (await db.find(q)).docs;
        
        res.send(players);
    }
};
