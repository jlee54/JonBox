<template>
  <button
    @click="createLobby"
  >Create a New Lobby!</button>
  <br><br>
  <div>
    <input placeholder="Lobby code"
      v-model="lobbyCode"
    />
    <button
      @click="joinLobby"
    >Join Lobby</button>
  </div>
</template>

<script>

export default {
  name: "StartGame",
  props: {},
  data() {
    return {
      lobbyCode: null
    }
  },
  mounted() {
    //this.$socket.emit('hey');
    // this.$socket.emit('room', 'room');
    // this.$socket.on('hello', () => {
    //   console.log("using hello emit");
    // });
  },
  methods: {
    async createLobby() {
      let response = await fetch("http://localhost:3000/createLobby", {
        method: 'POST'
      });

      response = await response.json();

      this.$router.push({
        name: "Lobby",
        params: {
          code: response.code
        }
      });
    },
    async joinLobby() {
      let response = await fetch("http://localhost:3000/joinLobby", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          lobbyCode: this.lobbyCode
        })
      });

      response = await response.json();

      if (response.error) {
        console.log(response.error);
      } else {
        this.$router.push({
          name: "PreLobby",
          params: {
            code: this.lobbyCode,
            playerId: response.id
          }
        });
      }
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
