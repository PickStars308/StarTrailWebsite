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
</template>

<style scoped lang="scss"></style>
