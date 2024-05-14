import { createRouter, createWebHistory } from "vue-router";
import Login from "./components/LoginModal.vue";
import Generator from "./components/Generator.vue";
import Scanner from "./components/Scanner.vue";
import Profile from "./components/Profile.vue";
import Settings from "./components/Settings.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/main",
      name: "Scanner",
      component: Scanner,
    },
    {
      path: "/generator",
      name: "Generator",
      component: Generator,
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
    },
    {
      path: "/settings",
      name: "Settings",
      component: Settings,
    },
  ],
});

export default router;
