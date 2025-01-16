<script setup lang="ts">
import { useMainStore } from "../stores";

const userStore = useMainStore();

import { FetchDownload } from "../Utils/FetchDownload";
import FooterView from "../components/FooterView.vue";
import ContactView from "../components/ContactView.vue";
import Sentence from "../components/Sentence.vue";
import FriendsView from "../components/FriendsView.vue";
import SkillsView from "../components/SkillsView.vue";
</script>

<template>
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

          <div class="DownloadList">
            <a class="item" @click.prevent="FetchDownload('Release')">
              <div class="text">发布版</div>
              <div class="bg">
                <div class="Release">
                  <svg t="1737032501342" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="11293" width="100" height="100">
                    <defs>
                      <!-- 定义线性渐变 -->
                      <linearGradient id="grad1" x1="50%" y1="0%" x2="50%" y2="100%" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stop-color="white" />
                        <stop offset="100%" stop-color="white" stop-opacity="0" />
                      </linearGradient>
                    </defs>

                    <!-- 背景路径 -->
                    <path d="M0 0h1024v1024H0z" fill="#FFFFFF" fill-opacity=".01" p-id="11294"></path>

                    <!-- 主要路径，使用渐变填充 -->
                    <path
                      d="M893.44 75.849143L99.693714 466.432a36.571429 36.571429 0 0 0-4.681143 62.829714l183.369143 126.756572c15.798857 7.899429 31.524571 7.899429 47.323429-7.899429l434.102857-370.980571-378.88 402.505143c-7.826286 7.899429-7.826286 15.798857-7.826286 23.698285v173.641143c0 15.798857 7.899429 31.597714 23.625143 39.497143 15.798857 7.899429 31.597714 0 39.497143-7.899429l86.820571-88.429714 192.073143 128.146286a36.571429 36.571429 0 0 0 56.027429-22.674286L945.298286 116.297143a36.571429 36.571429 0 0 0-51.931429-40.521143z"
                      fill="url(#grad1)" p-id="11295"></path>
                  </svg>
                </div>

              </div>
            </a>
            <a class="item" @click.prevent="FetchDownload('Beta')">
              <div class="text">测试版</div>
              <div class="bg">
                <div class="Beta">
                  <svg t="1737033598350" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12270" width="100" height="100">
                    <defs>
                      <!-- 定义线性渐变 -->
                      <linearGradient id="grad1" x1="50%" y1="0%" x2="50%" y2="100%" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stop-color="white" />
                        <stop offset="100%" stop-color="white" stop-opacity="0" />
                      </linearGradient>
                    </defs>
                    <!-- 瓢虫图形，应用渐变填充 -->
                    <path d="M1011.78 545.68c8.12 8.19 12.22 17.92 12.22 29.11 0 11.19-4.06 20.92-12.18 29.11a39.168 39.168 0 0 1-28.78 12.29H839.67c0 73.73-14.3 136.23-42.9 187.54L929.9 938.88c8.08 8.19 12.14 17.88 12.14 29.11s-4.06 20.92-12.14 29.11c-7.68 8.19-17.3 12.29-28.82 12.29s-21.1-4.1-28.78-12.29L745.57 869.72c-2.12 2.16-5.34 4.94-9.62 8.41-4.28 3.47-13.24 9.58-26.88 18.43-13.64 8.85-27.5 16.71-41.58 23.59-14.08 6.88-31.56 13.17-52.48 18.76-20.23 5.51-41.1 8.34-62.06 8.41V367.9h-81.92v579.42c-21.76 0-43.41-2.93-64.95-8.74s-40.12-12.95-55.66-21.32c-15.58-8.41-29.66-16.82-42.24-25.24-12.58-8.41-21.87-15.4-27.83-20.99l-9.62-9.07-117.12 133.86c-7.8 8.75-19 13.69-30.72 13.57-10.24 0-19.42-3.44-27.5-10.35-8.12-7.75-12.47-17.37-13.13-28.78-0.66-11.41 2.67-21.43 9.91-30.06l129.28-146.8c-24.76-49.15-37.12-108.22-37.12-177.19H40.96c-11.08 0-20.7-4.1-28.78-12.29S0 586.02 0 574.79c0-11.19 4.06-20.92 12.18-29.11s17.7-12.29 28.78-12.29h143.37V343.25L73.62 231.38c-8.12-8.19-12.14-17.88-12.14-29.11s4.06-20.92 12.14-29.11c8.12-8.19 17.7-12.29 28.82-12.29s20.7 4.1 28.78 12.29l110.71 111.88h540.18l110.71-111.88c8.12-8.19 17.7-12.29 28.78-12.29s20.7 4.1 28.78 12.29c8.12 8.19 12.18 17.88 12.18 29.11s-4.06 20.92-12.18 29.11L839.67 343.25v190.14h143.37c11.08 0 20.7 4.1 28.78 12.29h-0.04zM667.31 74.44c42.75 39.9 64.11 88.21 64.11 144.97H292.55c0-56.76 21.36-105.07 64.11-144.97s94.5-59.83 155.32-59.83 112.57 19.97 155.33 59.83z" fill="url(#grad1)" p-id="12271"></path>
                  </svg>

                </div>
              </div>
            </a>
            <a class="item" @click.prevent="FetchDownload('Internal')">
              <div class="text">内测版</div>
              <div class="bg">
                <div class="Internal">
                  <svg width="100" height="100" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="50" fill="url(#paint0_linear)"></circle>
                    <defs>
                      <linearGradient id="paint0_linear" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white"></stop>
                        <stop offset="1" stop-color="white" stop-opacity="0"></stop>
                      </linearGradient>
                    </defs>
                  </svg>

                </div>
              </div>
            </a>
          </div>

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
</template>

<style scoped lang="scss"></style>
