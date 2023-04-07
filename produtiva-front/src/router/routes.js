import { userAuth } from "@/stores/auth.js";

export default async function routes(to, from, next) {
  const auth = userAuth();

  if (to.meta?.requiresAuth) {
    auth.isAuth ? next() : next({ name: "Login" });
  } else {
    next();
  }
}
