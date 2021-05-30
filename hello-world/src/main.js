import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

createApp(App).use(store).use(router).mount("#app");

import { io } from "socket.io-client";
const socket = io("http://localhost:3000", {
});

socket.emit("test", {}, (res) => {
 if ("error" in res) {
    // handle the error
    console.log('error');
  } else {
    // success!
    console.log('sucess');
  }
  console.log(res);
});