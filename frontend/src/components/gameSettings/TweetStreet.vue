<template>
  <h3>Tweet Street Settings:</h3>
  <div>
    <label>Twitter Account:</label><br>
    <input placeholder="@"
      v-model="source_twitter_account"
      @change="getValidTwitterAccount"
    />
    <br>
    <span v-if="source_found.error"> {{ source_found.error }} </span>
    <span v-else-if="source_found.name">Account Found: {{ source_found.name }}</span>
  </div>
  <div>
    <label>Include retweets:</label>
    <input
      type="checkbox"
      disabled
      v-model="include_retweets"
    />
  </div>
  <div>
    <label>Include media:</label>
    <input
      type="checkbox"
      v-model="include_media"
    />
  </div>
  <div>
    <label>Minimum Likes:</label><br>
    <input
      v-model="min_likes"
    />
  </div>
  <div>
    <label>Minimum Retweets:</label><br>
    <input
      v-model="min_retweets"
    />
  </div>
  <div>
    <label>Minimum Replies:</label><br>
    <input
      v-model="min_replies"
    />
  </div>
</template>

<script>
  import { ref } from 'vue'

  export default {
    name: "Tweet-Street",
    props: {
      lobby_code: String,
    },
    setup() {
        const source_found = ref({});
        const source_twitter_account = "";
        const include_retweets = false;
        const include_media = false;
        const min_likes = 0;
        const min_retweets = 0;
        const min_replies = 0;

        return {
          source_found,
          source_twitter_account,
          include_retweets,
          include_media,
          min_likes,
          min_retweets,
          min_replies
        }
    },
    methods: {
      async getValidTwitterAccount() {
        let params = new URLSearchParams({
          account_handle: this.source_twitter_account
        });
        let response = await fetch("http://localhost:3000/getValidTwitterAccount?" + params, {
          method: "GET",
          jsonheaders: {"Content-Type": "application/json"},
        });

        response = await response.json();

        if (response.error) {
          this.source_found.error = response.error;
        } else {
          this.source_found = response;
        }
      },
      async validateConf() {
        let response = await fetch("http://localhost:3000/validateTweetStreet", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            lobbyCode: this.lobby_code,
            accountHandle: this.source_found.username,
            includeRetweets: this.include_retweets,
            includeMedia: this.include_media,
            minLikes: this.min_likes,
            minRetweets: this.min_retweets,
            minReplies: this.minReplies
          })
        });

        response = await response.json();
        return response.error
      }
    }
  }
</script>

<style scoped lang="scss">
    div {
      margin-top: 1rem;
    }
</style>