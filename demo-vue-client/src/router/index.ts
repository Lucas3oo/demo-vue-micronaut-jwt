import { createRouter, createWebHistory } from "vue-router";
import { LoginCallback } from "@okta/okta-vue";
import { navigationGuard } from "@okta/okta-vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      alias: "/books",
      component: () => import("../views/BookListView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/books/:id",
      component: () => import("../views/BookDetailsView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/create",
      component: () => import("../views/BookCreateView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/profile",
      component: () => import("../views/ProfileView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login/callback",
      component: LoginCallback,
    },
  ],
});

router.beforeEach(navigationGuard);

export default router;
