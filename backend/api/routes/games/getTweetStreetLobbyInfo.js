const db = require("../../db");

module.exports = async (req, res) => {
    let lobby_code = req.query.lobbyCode;

    q = {
        selector: {
            lobby_code: { "$eq": lobby_code },
            type: { "$eq": "Tweets"},
        },
        fields: ["tweets"],
    };
    let response = {
        "tweets": (await db.find(q)).docs,
    }
    
    res.send(response);
};
