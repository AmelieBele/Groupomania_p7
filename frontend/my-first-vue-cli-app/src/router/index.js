import { createRouter, createWebHistory } from "vue-router";
import HomeAuthPage from "../views/HomeAuthPage.vue";
import FeedPage from "../views/FeedPage.vue";
import EditPostPage from "../views/EditPostPage.vue";

const routes = [
  {
    path: "/",
    name: "homeAuth",
    component: HomeAuthPage,
  },
  {
    path: "/feed/:userId",
    name: "feed",
    component: FeedPage,
    meta: { requireAuth: true },
  },
  {
    path: "/modifyPost/:idPost",
    name: "modifyPost",
    component: EditPostPage,
    meta: { requireAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
