<template>
  <!-- 返回顶部按钮 -->

  <div class="Sidebar" :class="{ show: isVisible, hide: !isVisible }">
    <div class="Item" @click="userStore.setShowDialog(!userStore.getShowDialog)">
      <SvgIcon icon-name="icon-Setting"></SvgIcon>
    </div>

    <div class="Item" @click="scrollToTop">
      <SvgIcon icon-name="icon-BackToTop"></SvgIcon>
    </div>

    <a href="https://github.com/PickStars308/StarTrailWebsite" target="_blank" class="Item">
      <div class="Item">
        <SvgIcon icon-name="icon-Github"></SvgIcon>
      </div>
    </a>
  </div>
</template>

<style scoped lang="scss">
.Sidebar {
  z-index: 1;
  position: fixed;
  right: 10px;
  bottom: 20px;
  transition:
    opacity 0.5s,
    transform 0.5s;

  .Item {
    margin: 10px;
    width: 50px;
    height: 50px;
    background-color: rgba(51, 51, 51, 0.61);
    color: white;
    border: none;
    border-radius: 20%;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  &.show {
    transform: translateX(0px); // 显示时平移到原位
  }

  &.hide {
    transform: translateX(100px); // 隐藏时平移到右侧
  }
}
</style>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useMainStore } from "../stores";

const isVisible = ref(false);

// 页面滚动监听
const checkScroll = () => {
  if (window.scrollY > 300) {
    if (!isVisible.value) {
      isVisible.value = true;
    }
  } else {
    if (isVisible.value) {
      isVisible.value = false;
    }
  }
};

// 滚动到顶部
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  window.addEventListener("scroll", checkScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", checkScroll);
});

const userStore = useMainStore();
</script>
