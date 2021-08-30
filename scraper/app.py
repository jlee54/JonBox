from flask import Flask, request
import json
import twitter

app = Flask(__name__)

@app.route('/')
def index():
    return 'Home page'


@app.route('/getUserTweets', methods=["POST"])
def getUserTweets():
    data = request.json
    user = data["username"]
    options = []
    tweets = twitter.getUserTweets(user, options)
    tweets = json.dumps(tweets, default=str)

    return tweets


if __name__ == "__main__":
    app.run(debug=True)