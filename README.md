Generic installation instructions. These are untested, just going off memory here.

# Installation
1. Clone Repo
1. Install yarn (if not installed)
1. Install python 3 (3.8 used)
1. Install couchDB (https://docs.couchdb.org/en/main/install/index.html)
1. Within frontend folder run `yarn install`
1. Within backend folder run `yarn install`

# Running
1. Within frontend folder run `yarn serve`
1. Within backend folder run `yarn dev`
  -> Create .env file with variables:
    - DB_USERNAME (ex. "jlee") (For CouchDB)
    - DB_PASSWORD (ex. "") (For CouchDB)
    - TWITTER_TOKEN (ex. "") (For Twitter API usage)
    - SCRAPER_URL (ex ""http://127.0.0.1:5000") (For Web Scrapper - Default IP)
1. Within scrapper folder run `python app.py `
