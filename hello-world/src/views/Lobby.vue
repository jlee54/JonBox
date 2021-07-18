<template>
    Hey the lobby code is {{ code }}
</template>

<script>
export default {
  name: "Lobby",
  props: {
    code: String,
  },
  data() {
    return {
      players: []
    }
  },
  methods: {
    async getLobby() {
      let response = await fetch("http://localhost:3000/getLobby", {
        method: "GET",
        jsonheaders: {"Content-Type": "application/json"},
        body: JSON.stringify({
          lobbyCode: this.code
        })
      });

      response = await response.json();
      console.log(response);
      this.players = response.players;
    }

  },
  created() {
    console.log("hit lobby page");

    this.$socket.on("player joined", () => {
      console.log("player joined");
    });

    this.$socket.on("player configured", () => {
      console.log("player configured");
    });

  },
  mounted () {
    // console.log(this);

    // this.sockets.subscribe("player configured", (data) => {
    //   // Vue.set(vm.dataStore, 'user', data.user)   // or vm.$set(...)
    //   //    Vue.set(vm.dataStore, 'value', data. value)
    //   //    console.log(vm.dataStore)
    //     //this.players.push(data);
    //     console.log('heyyaaa');
    //     console.log(data);
    // });
    // this.sockets.on("player configured", (data) => {
    //   console.log('suhhh');
    //   console.log(data);
    // });

    //this.$socket.emit('hey');



  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
