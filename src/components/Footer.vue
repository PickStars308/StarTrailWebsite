<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
      author: '摘星辰',
      icpNumber: '',
    }
  },
}
</script>

<template>
  <footer class="ep-footer">
    <div style="text-align: center;">
      <p>
        <span>2022 - {{ currentYear }} © {{ author }} <span v-if="icpNumber"> | {{ icpNumber }} </span></span>
      </p>
      <span class="link">
        本站由
        <a href="https://cn.vuejs.org/" title="Vuejs官网" alt="Vuejs官网" target="_blank">Vue + Vite</a> 强力驱动丨搭配
        <a href="https://www.antdv.com/" title="Ant Design官网" alt="Ant Design官网" target="_blank">Ant Design</a>
        <p>原始项目由 <a href="https://github.com/sun0225SUN/star-trail" target="_blank">sun0225SUN</a> 发布，修改自 <a
          href="https://github.com/sun0225SUN/star-trail" target="_blank"
        >star-trail</a></p>
      </span>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.ep-footer {
  color: rgb(255 255 255 / 0.6);
  margin-top: 20rem;
  margin-bottom: 3rem;

  .link a {
    color: #ffffff;
  }
}
</style>
