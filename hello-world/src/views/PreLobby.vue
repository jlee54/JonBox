<template>
  <div>
    <input placeholder="Player Name"
      v-model="playerName"
    />
    <br><br>
    <button
      @click="configurePlayer"
    >Join Lobby</button>
  </div>
</template>

<script>
export default {
  name: "PreLobby",
  props: {
    code: String,
    playerId: String
  },
  data() {
    return {
      playerName: null
    }
  },
  methods: {
    async configurePlayer() {
      let response = await fetch("http://localhost:3000/configurePlayer", {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          playerId: this.playerId,
          lobbyCode: this.code,
          playerName: this.playerName
        })
      });

      response = await response.json();
      console.log(response);

      this.$router.push({
        name: "Lobby",
        params: {
          code: this.code
        }
      });
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
