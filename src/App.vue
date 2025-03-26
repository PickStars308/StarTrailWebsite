<script lang="ts">
// 示例：输出带图标的日志
import { ConsoleLogger } from "./Utils/ConsoleLogger";
import http from "@/Utils/Axios";

const icon = `

  ██████╗ ██╗ ██████╗██╗  ██╗    ███████╗████████╗ █████╗ ██████╗ ███████╗
  ██╔══██╗██║██╔════╝██║ ██╔╝    ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔════╝
  ██████╔╝██║██║     █████╔╝     ███████╗   ██║   ███████║██████╔╝███████╗
  ██╔═══╝ ██║██║     ██╔═██╗     ╚════██║   ██║   ██╔══██║██╔══██╗╚════██║
  ██║     ██║╚██████╗██║  ██╗    ███████║   ██║   ██║  ██║██║  ██║███████║
  ╚═╝     ╚═╝ ╚═════╝╚═╝  ╚═╝    ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝

    `;

const appInfo = {
  版本: import.meta.env.VITE_PICKSTARS_VERSION,
  作者: "摘星辰",
  "作者 GitHub": "https://github.com/PickStars308",
  网站: "https://pickstars.us.kg/",
};

ConsoleLogger.logStructured(appInfo, icon, "font-size: 16px;color: #50b16e;");
</script>

<script setup lang="ts">
import StarTrails from "@/components/StarTrails.vue";
import Lantern from "@/components/Lantern.vue";

import Loading from "@/components/Loading.vue";

import { ref, onMounted } from "vue";
import axios from "axios";

import { ElNotification } from "element-plus";

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
      console.error("未找到 Background Document....");
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
    const response = await http.get("/assets/Data/Json/WebConfig.json");

    if (response.data) {
      WebConfig.value = response.data;
      userStore.setLoading(false);

      if (WebConfig.value.Lantern.Enable) {
        ElNotification({
          title: "提示",
          message: `祝各位新年快乐~`,
          type: "info",
        });
      }
    } else {
      ElNotification({
        title: "提示",
        message: "获取的配置数据格式不正确",
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

  <NavBar />

  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>

  <SidebarTool />

  <!-- 背景-->
  <StarTrails />

  <DialogView />
</template>

<style lang="scss">
@use "./assets/style/Home" as *;
</style>
