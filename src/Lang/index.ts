// locale/index.ts
// 导入全局中英文配置对象
import en from "./EnUS";
import zh from "./ZhCN";
import { createI18n } from "vue-i18n";

// 默认读取本地存储语言设置
const defaultLocale = localStorage.getItem("SelectedLanguage") || "EnUS";

const i18n = createI18n({
  locale: defaultLocale, // 默认语言
  fallbackLocale: "EnUS", // 不存在默认则为英文
  legacy: false,
  globalInjection: true, // 全局模式，可以直接使用 $t
  messages: {
    EnUS: en, // 标识:配置对象
    ZhCN: zh,
  },
});

export default i18n;
