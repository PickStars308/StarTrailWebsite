import { createApp } from "vue";

import App from "./App.vue";

import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import "@/assets/Style/Style.scss";
import "@/assets/iconfont/iconfont.js";

import router from "./router";

import i18n from "./Lang"; //引入国际化

const app = createApp(App);

const pinia = createPinia();

app.use(router);

app.use(i18n);

app.use(pinia);

pinia.use(piniaPluginPersistedstate);

app.use(ElementPlus);

app.mount("#app");
