const Twitter = require("../../../twitter/twitter.js");

module.exports = async (req, res) => {
    const lobby_code = req.body.lobbyCode;
    const account_handle = req.body.accountHandle;
    const include_retweets = req.body.includeRetweets;
    const include_media = req.body.includeMedia;
    const min_likes = req.body.minLikes || 0;
    const min_retweets = req.body.minRetweets || 0;
    const min_replies = req.body.minReplies || 0;

    try {
        await Twitter.getUserByUsername(account_handle);

        let tweets = await Twitter.getTweetsByUserName(account_handle);

        if (tweets.length < 20) {
          res.send({
              error: "No enough tweets found."
          });
        }

        for(let index in tweets) {
            let tweet = tweets[index];
            if (!include_retweets) {
                if (tweet.retweetedTweet) {
                    tweets.splice(index, 1);
                    continue;
                }
            }

            if (!include_media) {
                if (tweet.media) {
                    tweets.splice(index, 1);
                    continue;
                }
            }

            if (tweet.likeCount < min_likes) {
                tweets.splice(index, 1);
                continue;
            }

            if (tweet.rewtweetCount < min_retweets) {
                tweets.splice(index, 1);
                continue;
            }

            if (tweet.replyCount < min_replies) {
                tweets.splice(index, 1);
                continue;
            }
        }

        if (tweets.length < 20) {
          res.send({
              error: "No enough tweets found with current conditions."
          });
        }

        Twitter.createLobbyTweets(tweets, lobby_code);

        res.send(true);
    } catch (e){
        console.log(e);
        res.send({
            error: e.message
        });
    }
};
