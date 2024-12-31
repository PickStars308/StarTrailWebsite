<script lang="ts" setup>
import { fetchDownload } from "@/assets/Ts/FetchDownload";

import { useMainStore } from "@/stores/index";
import { checkDays, helloInit } from "@/Utils/Home";
import { ref, onMounted } from "vue";
import Loading from "./components/Loading.vue";

const userStore = useMainStore();

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
  版本信息：${process.env.VITE_PICKSTARS_VERSION}
  作者：摘星辰
  Github：https://github.com/PickStars308
  网站：https://www.pickstars.cn

%c
  当前开发环境：${process.env.NODE_ENV}
`,
  "font-size: 20px;font-weight: 600;color: #000000;",
  "font-size:12px;color: #000000;",
  "font-size:12px;color: #000000;",
  "font-size:12px;color: #000000;"
);

const isVisible = ref(true);

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
      isVisible.value = false; // 当滚动离开顶部时，隐藏 BottomNav
    } else {
      isVisible.value = true; // 滚动回顶部时，显示 BottomNav
    }

  });
});
</script>

<script lang="ts"></script>

<template>
  <!-- 加载中 -->
  <Loading v-if="userStore.isLoading" />

  <!-- 导航 -->
  <BottomNav class="bottom-nav" :class="{ hide: !isVisible }" />

  <!-- 主体 -->
  <main>
    <!-- 大标题 -->
    <section class="Hello">
      <div class="Intro">
        <div class="Container">
          <div class="HelloContainer">
            <Yulu />
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
            <img
              class="Avatar"
              src="https://q2.qlogo.cn/headimg_dl?dst_uin=1402832033&spec=640"
            />
            <P style="padding-top: 1em"> It's good to see you. </P>
            <br />
            <p>
              你好，这里是摘星辰，热爱编程，
              如果你喜欢哪个开发的APP，就通过下方进行下载吧~
            </p>
            <br />
            <p>
              一望无际的迷雾中，有人在寻找光明。<br />
              <br />共同努力，期待未来！
            </p>

            <div class="ChatBox">
              <div
                class="Line Loading"
                :class="[{ hidden: !userStore.isLoading }]"
              >
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
          <Skills />
        </div>
      </div>
    </section>
    <!-- 下载摘星辰 -->
    <section class="DownloadPickstars">
      <div class="Container">
        <h2 class="ChTitle">Download <span>下载</span></h2>
        <div class="Clear Col3">
          <a target="_blank" @click.prevent="fetchDownload('Release')">
            <div class="item">
              <div class="bg" style="background-color: #003366" />
              <div class="inner"><span>发布版</span></div>
            </div>
          </a>
          <a target="_blank" @click.prevent="fetchDownload('Beta')">
            <div class="item">
              <div class="bg" style="background-color: #ff5722" />
              <div class="inner"><span>测试版</span></div>
            </div>
          </a>
          <a target="_blank" @click.prevent="fetchDownload('Internal')">
            <div class="item">
              <div class="bg" style="background-color: #9c27b0" />
              <div class="inner"><span>内测版</span></div>
            </div>
          </a>
        </div>
      </div>
    </section>
    <!-- 摘星辰生活的地方 -->
    <section class="PickstarsLife">
      <div class="Container">
        <h2 class="ChTitle">摘星辰生活的<span>地方</span></h2>
        <Contact />
      </div>
    </section>
    <!-- 摘星辰生活的地方 -->
    <section class="PickstarsFriend">
      <div class="Container">
        <h2 class="ChTitle">摘星辰的<span>邻居</span></h2>
        <Friends />
      </div>
    </section>
    <!-- 底部 -->
    <FooterView />
  </main>

  <StarTrails />
</template>

<style lang="scss">
@use "@/assets/css/Home" as *;
@use "@/assets/css/style" as *;
</style>

<style lang="scss" scoped>
/* 设置 BottomNav 的平滑过渡动画 */
.bottom-nav {
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  will-change: transform; /* 提示浏览器优化 transform 动画 */

  &.hide {
    transform: translateY(100%);
  }
}

.bottom-nav:not(.hide) {
  transform: translateY(0);
}
</style>
