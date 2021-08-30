<template>
  <div>

  </div>
</template>

<script>
export default {
  name: "TweetStreet",
  props: {
    lobby_code: String
  },
  setup() {
    const tweets = [];
    return {
      tweets
    }
  },
  methods: {
    async getTweetStreetLobbyInfo() {
      let params = new URLSearchParams({
        lobbyCode: this.lobby_code
      });
      let response = await fetch("http://localhost:3000/getTweetStreetLobbyInfo?" + params, {
        method: "GET",
        jsonheaders: {"Content-Type": "application/json"},
      });

      response = await response.json();
      this.tweets = response.tweets;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
