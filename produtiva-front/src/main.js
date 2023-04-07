import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { userAuth } from "@/stores/auth.js";
import "./styles/app.css";
import "flowbite/dist/flowbite.js";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(Toast);

if (localStorage.getItem("token")) {
  (async () => {
    const auth = userAuth();
    try {
      auth.setIsAuth(true);
      await auth.checkToken();
    } catch (error) {
      auth.clear();
    }
  })();
}

app.mount("#app");
