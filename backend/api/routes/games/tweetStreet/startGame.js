const db = require(base+"/db");
const Twitter = require(base+"/twitter/twitter.js");
const Player = require(base+"/models/Player.js");
//Require folder paths in app.js

module.exports = async (req, res) => {
    let lobby_code = req.query.lobbyCode;

    try {
        let tweets_info = await Twitter.getTweetsInfoByLobby(lobby_code);
        let players = await Player.getPlayersByLobby(lobby_code);

        const rounds = 3;
        const per_round = 2;
        let tweets = tweets_info.tweets;
        let assigned_tweets = [];

        for (let player of players) {
            for (let i = 0; i < per_round*rounds; i++) {
                let tweet_index = Math.floor(Math.random() * tweets.length);
                let tweet = tweets[tweet_index];
                tweet["player_id"] = player["_id"];
                tweets.splice(tweet_index, 1);
                assigned_tweets.push(tweet)
            }
        }


        let headers = await db.head(tweets_info["_id"]);
        let rev = headers.etag;
        rev = rev.slice(1, -1);

        let tweets_data = {
            _id: tweets_info["_id"],
            _rev: rev,
            tweets: assigned_tweets,
            type: "Tweets",
            lobby_code: lobby_code,
            date: (new Date()).toISOString()
        };

        await db.insert(tweets_data);

        res.send();
    } catch (e){
        console.log(e);
        res.send({
            error: e.message
        });
    }
};