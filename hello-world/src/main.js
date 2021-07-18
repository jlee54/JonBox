import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import socketio from './plugins/Socket.io'

const app = createApp(App);
app.use(store);
app.use(router);
app.use(socketio, {
    connection: 'http://localhost:3000',
    options: {}
});
app.mount("#app");



//io.on("connection", socket => {
  // socket.on("hello", () => {
  //   console.log('hello found');
  // })
// }); 



// socket.emit("test", {}, (res) => {
//  if ("error" in res) {
//     // handle the error
//     console.log('error');
//   } else {
//     // success!
//     console.log('sucess');
//   }
//   console.log(res);
// });

// createApp(App).use(socket);

// new Vue({
//     router,
//     store,
//     render: h => h(App)
// }).$mount('#app')

// console.log(this.sockets);