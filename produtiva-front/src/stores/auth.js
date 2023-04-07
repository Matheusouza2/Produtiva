import { ref } from "vue";
import { defineStore } from "pinia";
import http from "@/helpers/http.js";
import router from "../router";

export const userAuth = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token"));
  const user = ref(JSON.parse(localStorage.getItem("user")));
  const isAuth = ref(false);

  function setToken(tokenValue) {
    localStorage.setItem("token", tokenValue);
    token.value = tokenValue;
  }

  function setUser(userValue) {
    localStorage.setItem("user", JSON.stringify(userValue));
    user.value = userValue;
  }

  function setIsAuth(auth) {
    isAuth.value = auth;
  }

  async function checkToken() {
    try {
      const tokenAuth = "Bearer " + token.value;
      const { data } = await http.get("/auth/verify", {
        headers: {
          Authorization: tokenAuth,
        },
      });
      return data;
    } catch (error) {
      clear();
      router.push({ name: "Login" });
      console.log("error", error.response.data);
    }
  }

  function clear() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    isAuth.value = false;
    token.value = "";
    user.value = "";
  }

  return {
    token,
    user,
    setToken,
    setUser,
    checkToken,
    clear,
    setIsAuth,
    isAuth,
  };
});
