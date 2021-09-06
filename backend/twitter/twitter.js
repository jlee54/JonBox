const bearer_token = process.env.TWITTER_TOKEN;
const TwitterV2 = require('twitter-v2');
const scraper_url = process.env.SCRAPER_URL;
const db = require("../db");

const client = new TwitterV2({
  bearer_token: bearer_token
});

class Twitter {

  static async getUserByUsername(username) {
    try {
      const { data } = await client.get("users/by", {
        usernames: username,
        "user.fields": "profile_image_url,description"
      });

      return data[0];
    } catch (error) {
      throw Twitter.accountNotFoundException();
    }
  }

  static async getTweetsByUserId(id) {
    const { data, meta } = await client.get("users/"+id+"/tweets", {
      "tweet.fields": "entities",
      "exclude": "replies,retweets",
      "max_results": 5
    });
    return {
      "tweets": data,
      "meta": meta
    };
  }

  static async getTweetsByUserName(account_handle, cache_read = true, cache_write = true) {
    let tweets;
    if (cache_read) {
      let q = {
        selector: {
            username: { "$eq": account_handle },
            type: { "$eq": "Tweets" },
        },
        fields: ["tweets"],
        limit: 1
      };
      let data = await db.find(q);
      if (data.docs.length) {
        tweets = data.docs[0].tweets;
      }
    }

    if (!tweets) {
      let url = scraper_url+"/getUserTweets";
      let response = await fetch(url, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            username: account_handle
          })
      });

      tweets = await response.json();

      if (tweets && cache_write) {
        let tweet_data = {
            username: account_handle,
            tweets: tweets,
            type: "Tweets",
            date: (new Date()).toISOString()
        };
        tweet_data = await db.insert(tweet_data);
      }
    }

    if (!tweets) {
      throw Twitter.tweetsNotFoundException();
    }

    return tweets;
  }

  static async getEmbeddedTweet(tweet_id) {
    let url = "https://twitter.com/whatever/status/"+tweet_id;
    url = "https://publish.twitter.com/oembed?url="+url;
    let response = await fetch(url);

    return await response.json();
  }

  static async getEmbeddedProfile(account_handle) {
    let url = "https://twitter.com/"+account_handle;
    url = "https://publish.twitter.com/oembed?url="+url;
    let response = await fetch(url);

    return await response.json();
  }

  // getIdByUsername('toomuchprotein').then(id => {
  //   getTweetsByUserId(id).then(tweets => {
  //       let tweet = tweets[0];

  //       getEmbeddedTweet(tweet.id).then(embeded_tweet => {
  //         console.log(embeded_tweet);
  //       });
  //   })
  // });

  static async createLobbyTweets(tweets, lobby_code) {
    let tweet_data = {
        tweets: tweets,
        type: "Tweets",
        lobby_code: lobby_code,
        date: (new Date()).toISOString()
    };
    await db.insert(tweet_data);
  }

  static async getTweetsInfoByLobby(lobby_code) {
    let q = {
        selector: {
            lobby_code: { "$eq": lobby_code },
            type: { "$eq": "Tweets"},
        },
        fields: ["_id", "rev", "tweets"],
    };

    let tweets = (await db.find(q)).docs;
    if (tweets.length == 0) {
      throw Twitter.tweetsNotFoundException();
    }

    return tweets[0];
  }

  static accountNotFoundException() {
    return {
      name: "AccountNotFound",
      message: "Account could not be found."
    }
  }

  static tweetsNotFoundException() {
    return {
      name: "TweetsNotFound",
      message: "Tweets could not be found."
    }
  }
}

// class TwitterAccountNotFoundException extends Error {
//   constructor() {
//     super("Account could not be found");
//     this.name = this.constructor.name;
//   }
// }


module.exports = Twitter;
