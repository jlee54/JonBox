<template>
  <button
    @click="createLobby"
  >Create a New Lobby!</button>
</template>

<script>
export default {
  name: "StartGame",
  props: {},
  methods: {
    createLobby() {
      console.log("yessss");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
