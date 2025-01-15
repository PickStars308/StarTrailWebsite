<script lang="ts">
console.info(
  `
%c 摘星辰 - 星辰工具箱
%c


  ██████╗ ██╗ ██████╗██╗  ██╗    ███████╗████████╗ █████╗ ██████╗ ███████╗
  ██╔══██╗██║██╔════╝██║ ██╔╝    ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔════╝
  ██████╔╝██║██║     █████╔╝     ███████╗   ██║   ███████║██████╔╝███████╗
  ██╔═══╝ ██║██║     ██╔═██╗     ╚════██║   ██║   ██╔══██║██╔══██╗╚════██║
  ██║     ██║╚██████╗██║  ██╗    ███████║   ██║   ██║  ██║██║  ██║███████║
  ╚═╝     ╚═╝ ╚═════╝╚═╝  ╚═╝    ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝

%c
  版本信息：${import.meta.env.VITE_PICKSTARS_VERSION || "未知"}
  作者：摘星辰
  Github：https://github.com/PickStars308
  网站：https://xinstudio.top

%c
  当前开发环境：${import.meta.env.NODE_ENV}
`,
  "font-size: 20px;font-weight: 600;color: #000000;",
  "font-size:12px;color: #000000;",
  "font-size:12px;color: #000000;",
  "font-size:12px;color: #000000;",
);
</script>

<script setup lang="ts">
import StarTrails from "./components/StarTrails.vue";
import Lantern from "./components/Lantern.vue";

import Sentence from "./components/Sentence.vue";
import ContactView from "./components/ContactView.vue";
import SkillsView from "./components/SkillsView.vue";
import FooterView from "./components/FooterView.vue";
import FriendsView from "./components/FriendsView.vue";

import Loading from "./components/Loading.vue";

import { ref, onMounted } from "vue";
import axios from "axios";

import { ElNotification } from "element-plus";

import { FetchDownload } from "./Utils/FetchDownload";

import { useMainStore } from "./stores";

import { checkDays, helloInit } from "./Utils/Home";

const userStore = useMainStore();

const isVisible = ref(true);

// WebConfig 初始化

onMounted(() => {
  checkDays();

  setTimeout(() => {
    helloInit();
  }, 1000);

  window.addEventListener("scroll", () => {
    const bg = document.getElementById("Background");
    const scrollTop = window.scrollY;
    if (bg) {
      if (scrollTop > 0.7 * window.innerHeight) bg.classList.add("fixed");
      else bg.classList.remove("fixed");
    } else {
      console.error("Background not found");
    }

    if (window.scrollY > 0) {
      isVisible.value = false;
    } else {
      isVisible.value = true;
    }
  });
});

// 获取配置数据
const WebConfig = ref({
  Lantern: {
    Enable: false,
    String: "",
  },
});

// 请求配置文件
onMounted(async () => {
  try {
    const response = await axios.get("/assets/Data/Json/WebConfig.json");

    if (response.data) {
      WebConfig.value = response.data;
      userStore.setLoading(false);

      if (WebConfig.value.Lantern.Enable) {
        ElNotification({
          title: "提升",
          message: `祝各位新年快乐~`,
          type: "info",
        });
      }
    } else {
      ElNotification({
        title: "提示",
        message: "获取的配置数据格式不正确。",
        type: "warning",
      });
    }
  } catch (error) {
    ElNotification({
      title: "错误",
      message: `数据加载失败 Σヽ(ﾟД ﾟ; )ﾉ <br/>${error}`,
      type: "error",
      dangerouslyUseHTMLString: true, // 启用 HTML 渲染
    });
  }
});
</script>

<template>
  <Loading v-if="userStore.isLoading" />

  <Lantern v-if="WebConfig.Lantern.Enable" :lanternStrings="WebConfig.Lantern.String" />

  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>

  <!-- 背景-->
  <StarTrails />
</template>

<style lang="scss">
@use "./assets/style/Home" as *;
</style>
