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
    const response = await axios.get("/Assets/Data/Json/WebConfig.json");

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

  <main>
    <!-- 大标题 -->
    <section class="Hello">
      <div class="Intro">
        <div class="Container">
          <div class="HelloContainer">
            <Sentence />

            <div class="SectionSubtitle">
              <div class="RoundedSquares">
                <div class="bg-red" />
                <div class="bg-yellow" />
                <div class="bg-green" />
              </div>
              <div class="TextWhite">摘星辰 - 探星河 - 包罗万象</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 关于摘星辰 -->
    <section class="AboutPickstars">
      <div class="Container">
        <h2 class="ChTitle">Who am <span>摘星辰</span>？</h2>
        <div class="Clear">
          <div class="Introduct">
            <div class="AboutMe">

              <img
                class="Avatar"
                src="https://q2.qlogo.cn/headimg_dl?dst_uin=1402832033&spec=640"
                alt="Avatar"
              />
              <P style="padding-top: 1em">It's good to see you.</P>
              <br />
              <p>你好，这里是摘星辰，热爱编程， 如果你喜欢哪个开发的APP，就通过下方进行下载吧~</p>
              <br />
              <p>
                一望无际的迷雾中，有人在寻找光明。<br />
                <br />共同努力，期待未来！
              </p>

            </div>
            <!-- 摘星辰生活的地方 -->
            <div class="PickstarsLife">
              <ContactView />

            </div>
            <div class="ChatBox">
              <div class="Line Loading" :class="[{ hidden: !userStore.isLoading }]">
                <span /><span /><span />
              </div>
            </div>
          </div>
          <SkillsView />
        </div>
      </div>
    </section>
    <!-- 下载摘星辰 -->
    <section class="DownloadPickstars">
      <div class="Container">
        <h2 class="ChTitle">Download <span>下载</span></h2>
        <div class="Clear Col3">
          <a target="_blank" @click.prevent="FetchDownload('Release')">
            <div class="item">
              <div class="bg" style="background-color: #003366" />
              <div class="inner"><span>发布版</span></div>
            </div>
          </a>
          <a target="_blank" @click.prevent="FetchDownload('Beta')">
            <div class="item">
              <div class="bg" style="background-color: #ff5722" />
              <div class="inner"><span>测试版</span></div>
            </div>
          </a>
          <a target="_blank" @click.prevent="FetchDownload('Internal')">
            <div class="item">
              <div class="bg" style="background-color: #9c27b0" />
              <div class="inner"><span>内测版</span></div>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- 摘星辰生活的地方 -->
    <section class="PickstarsFriend">
      <div class="Container">
        <h2 class="ChTitle">摘星辰的<span>邻居</span></h2>

        <FriendsView />
      </div>
    </section>

    <!-- 底部 -->
    <FooterView />
  </main>

  <!-- 背景-->
  <StarTrails />
</template>

<style lang="scss">
@use "./assets/style/Home" as *;
</style>
