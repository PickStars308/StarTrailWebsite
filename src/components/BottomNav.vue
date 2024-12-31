<template>
  <div class="NavigationBar">
    <ul class="BottomNav">
      <li v-for="(item, index) in navItems" :key="index" class="IconContent">
        <a :href="item.Link" class="Link" :data-social="item.Name">
          <!-- 动态绑定颜色 -->
          <S-icon
            :icon="item.Icon"
            :style="{ color: hoverIndex === index ? item.HoverColor : '' }"
            @mouseover="hoverIndex = index"
            @mouseleave="hoverIndex = null"
          />
        </a>
        <div class="Tooltip">{{ item.Tooltip }}</div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const navItems = ref([
  {
    Name: "Home",
    Link: "#",
    Icon: "line-md:home",
    Tooltip: "Home",
    HoverColor: "#1db954",
  },
  {
    Name: "SiteStatus",
    Link: "https://stats.uptimerobot.com/KRCYholq9z",
    Icon: "line-md:speed",
    Tooltip: "SiteStatus",
    HoverColor: "#F09199",
  },
  {
    Name: "Github",
    Link: "https://github.com/PickStars308",
    Icon: "line-md:github",
    Tooltip: "Github",
    HoverColor: "#555555",
  },
  {
    Name: "Email",
    Link: "mailto:1402832033@qq.com",
    Icon: "line-md:email",
    Tooltip: "Email",
    HoverColor: "#F58930",
  },
]);

// 用于跟踪当前悬停的索引
const hoverIndex = ref(null);
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.NavigationBar {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  left: 0;
  right: 0;
  z-index: 11;

  .BottomNav {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
    background-color: #333;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 20px;

    .IconContent {
      margin: 0 10px;
      position: relative;
      font-weight: bolder;

      .Tooltip {
        position: absolute;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #fff;
        color: #000;
        padding: 6px 10px;
        border-radius: 5px;
        opacity: 0;
        visibility: hidden;
        font-size: 14px;
        transition: all 0.3s ease;
        font-weight: bolder;
      }

      .Link {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        border-radius: 30%;
        color: #fff;
        background-color: #000;
        transition: all 0.3s ease-in-out;
        font-weight: bolder;
      }

      .Link:hover {
        box-shadow: 3px 2px 45px 0px rgb(0 0 0 / 12%);
      }

      .Link svg {
        width: 30px;
        height: 30px;
        fill: #fff;
      }
    }

    .IconContent:hover .Tooltip {
      opacity: 1;
      visibility: visible;
      top: -60px;
    }
  }
}
</style>
