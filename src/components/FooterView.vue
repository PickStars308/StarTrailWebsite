<script setup lang="ts">
import { ref } from "vue";

// 定义响应式数据
const currentYear = ref(new Date().getFullYear());
const author = ref("摘星辰");
const icpNumber = ref(""); // 你可以根据需求设置icpNumber值
</script>

<template>
  <footer class="footer">
    <div style="text-align: center">
      <p>
        <span
          >2022 - {{ currentYear }} © {{ author }}
          <span v-if="icpNumber"> | {{ icpNumber }} </span></span
        >
      </p>
      <span class="link">
        本站由
        <a href="https://cn.vuejs.org/" title="Vuejs官网" alt="Vuejs官网" target="_blank"
          >Vue + Vite</a
        >
        强力驱动丨搭配
        <a
          href="https://element-plus.org/"
          title="Element Plus官网"
          alt="Element Plus官网"
          target="_blank"
          >Element Plus</a
        >
        <p>
          原始项目由
          <a href="https://github.com/sun0225SUN/star-trail" target="_blank">sun0225SUN</a>
          发布，修改自
          <a href="https://github.com/sun0225SUN/star-trail" target="_blank">star-trail</a>
        </p>
      </span>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  color: rgb(255 255 255 / 0.6);
  margin-top: 3rem;
  margin-bottom: 3rem;

  line-height: 2rem;

  .link a {
    color: #ffffff;
  }
}
</style>
