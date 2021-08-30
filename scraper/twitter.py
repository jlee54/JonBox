# https://github.com/JustAnotherArchivist/snscrape/blob/master/snscrape/modules/twitter.py
import snscrape.modules.twitter as sntwitter

def getUserTweets(user, options): 
    tweets = []

    # Using TwitterSearchScraper to scrape data and append tweets to list
    for i, tweet in enumerate(sntwitter.TwitterSearchScraper("from:"+user).get_items()):
        if i>50: #number of tweets you want to scrape
            break
        tweets.append({
            "date": tweet.date,
            "id": tweet.id,
            "content": tweet.content,
            "replyCount": tweet.replyCount,
            "retweetCount": tweet.retweetCount,
            "likeCount": tweet.likeCount,
            "retweetedTweet": tweet.retweetedTweet,
            "inReplyToTweetId": tweet.inReplyToTweetId,
            "inReplyToUser": tweet.inReplyToUser,
            "media": tweet.media
        })
        
    return tweets