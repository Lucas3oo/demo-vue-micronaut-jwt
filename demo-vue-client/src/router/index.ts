import { createRouter, createWebHistory } from "vue-router";
import LoginCallback from "@okta/okta-vue";
import { navigationGuard } from "@okta/okta-vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      alias: "/books",
      name: "books",
      component: () => import("../views/BookListView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/books/:id",
      name: "book-details",
      component: () => import("../views/BookDetailsView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/create",
      name: "create",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/BookCreateView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
    },
    {
      path: "/login",
      component: () => import("../components/OktaLoginWrapper.vue"),
    },
    {
      path: "/login/callback",
      component: LoginCallback,
    },
  ],
});

router.beforeEach(navigationGuard);

export default router;
