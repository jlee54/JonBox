<template>
    <div id="game-info">
      <div>Hey the lobby code is {{ code }}</div>
      <br>
      <div v-if="valid_conf">
        The game configuration is valid
      </div>
      <div v-else>
        The game configuration is not valid
      </div>
      <br>
      <div v-if="valid_lobby">
        The lobby is ready
        <br><br>
        <button @click="startGame"
        >Start Game</button>
      </div>
      <div v-else>
        The lobby is not ready
      </div>
    </div>
    <br>
    <div id="lobby-wrapper">
      <div id="game-select-wrapper">
        <h2>Game Select:</h2>
        <ul>
          <li>
            <a href="javascript:void(0);"
              @click="chooseGame('TWEET STREET')"
            >Tweet Street</a>
          </li>
        </ul>
      </div>
      <div id="player-list-wrapper">
        <h2>Players:</h2>
        <ul>
            <li v-for="player in players" v-bind:key="player">
              {{ player.name }}
            </li>
        </ul>
      </div>
    </div>
    <form>
      <modal v-if="show_modal">
          <template v-slot:body>
            <TweetStreetSettings
                ref="TWEET STREET"
                :lobby_code="code"
            ></TweetStreetSettings>
          </template>
          <template v-slot:footer>
              <span v-if="setting_error"> {{ setting_error }} </span>
              <button type="button" class="modal-default-button" @click="show_modal = false">
                Back
              </button>
              <button type="button" class="modal-default-button" @click="submitGameConf">
                Confirm
              </button>
          </template>
      </modal>
    </form>
</template>

<script>
import Modal from "@/components/Modal.vue";
import TweetStreetSettings from "@/components/gameSettings/TweetStreet.vue";

export default {
  name: "Lobby",
  components: {
    Modal,
    TweetStreetSettings
  },
  props: {
    code: String,
  },
  data() {
    return {
      players: [],
      show_modal: false,
      game_name: "",
      setting_error: "",
      valid_conf: false,
    }
  },
  methods: {
    async getLobby() {
      let params = new URLSearchParams({
        lobbyCode: this.code
      });
      let response = await fetch("http://localhost:3000/getLobby?" + params, {
        method: "GET",
        jsonheaders: {"Content-Type": "application/json"},
      });

      response = await response.json();

      this.players = response.players;
    },
    async chooseGame(game) {
      switch(game) {
        case "TWEET STREET":
          this.show_modal = true;
          break;
        default:
          console.log("Chosen game not found");
      }
      this.game_name = game;
    },
    async submitGameConf() {
      let error = await this.$refs[this.game_name].validateConf();

      this.setting_error = error;
      if (!error) {
        this.valid_conf = true;
        this.show_modal = false;
      } else {
        this.valid_conf = false;
      }
    },
    async startGame() {
      this.$router.push({
        name: "TweetStreet",
        params: {
          lobby_code: this.code
        }
      });
    }
  },
  created() {
    let $this = this;
    this.getLobby();

    this.$socket.on("player joined", () => {
      console.log("player joined");
      let pending_player = {
        "name": "pending",
      };
      $this.players.push(pending_player);
    });

    this.$socket.on("player configured", (data) => {
      console.log("player configured");

      let index = $this.players.findIndex(val => val["name"] == "pending");
      $this.players[index] = data;
    });
  },
  computed: {
    valid_lobby() {
      if (this.players.length > 1) {
        return true;
      }
      return false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  #game-info {
    text-align: center;
  }

  #lobby-wrapper {
    display: flex;
    justify-content: center;
  }

  #game-select-wrapper {
    min-width: 30%;
  }

  #player-list-wrapper {
    min-width: 50%;
  }

</style>
