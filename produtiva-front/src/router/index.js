import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/Login.vue";
import routes from "@/router/routes.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("../views/Dashboard.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/product",
      name: "Product",
      component: () => import("../views/Products.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach(routes);

export default router;
