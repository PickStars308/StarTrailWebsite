import { createApp } from "vue";

import App from "./App.vue"; // 找不到模块“./app.vue”或其相应的类型声明

import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import "@/assets/Style/Style.scss";
import "@/assets/iconfont/iconfont.js";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(ElementPlus);

app.mount("#app");
