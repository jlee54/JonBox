const db = require("../db");

class Player {

  static async getPlayersByLobby(lobby_code) {
    let q = {
        selector: {
            lobby_code: { "$eq": lobby_code },
            type: { "$eq": "Player"},
        },
        fields: ["_id"],
    };
    return (await db.find(q)).docs
  }

  // static tweetsNotFoundException() {
  //   return {
  //     name: "TweetsNotFound",
  //     message: "Tweets could not be found."
  //   }
  // }
}


module.exports = Player;
