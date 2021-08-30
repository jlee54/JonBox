import { createRouter, createWebHashHistory } from "vue-router";
import Start from "../views/Start.vue";

const routes = [
  {
    path: "/",
    name: "Start",
    component: Start,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/",
    name: "Lobby",
    component: () =>
      import(/* webpackChunkName: "lobby" */ "../views/Lobby.vue"),
    props: true,
  },
  {
    path: "/",
    name: "PreLobby",
    component: () =>
      import(/* webpackChunkName: "preLobby" */ "../views/PreLobby.vue"),
    props: true,
  },
  {
    path: "/",
    name: "TweetStreet",
    component: () =>
      import(/* webpackChunkName: "tweetStreet" */ "../views/games/TweetStreet.vue"),
    props: true,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
