import App from "@/App.vue";

import { DatePicker } from "ant-design-vue";
// 引入 ElementPlus
import ElementPlus from "element-plus";

import { createPinia } from "pinia";

import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import { createApp } from "vue";
import "@/assets/css/style.scss";

import "element-plus/dist/index.css";

const app = createApp(App);

// 创建 Pinia 实例
const pinia = createPinia();

// 使用持久化插件
pinia.use(piniaPluginPersistedState);
app.use(ElementPlus);

app.use(DatePicker);
app.use(pinia);

app.mount("#app");
