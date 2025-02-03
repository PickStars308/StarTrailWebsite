<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// 定义响应式数据
const currentYear = ref(new Date().getFullYear());
const icpNumber = ref("");

if (import.meta.env.VITE_SITE_ICP) {
  icpNumber.value = import.meta.env.VITE_SITE_ICP;
}
</script>

<template>
  <footer class="footer">
    <div style="text-align: center">
      <p>
        <span
          >2022 - {{ currentYear }} © {{ t("Layout.Footer.Pickstars") }}
          <span v-if="icpNumber"> | {{ icpNumber }} </span></span
        >
      </p>

      <span class="link">
        {{ t("Layout.Footer.PoweredByText") }}
        <a alt="Vuejs官网" href="https://cn.vuejs.org/" target="_blank" title="Vuejs官网">{{
          t("Layout.Footer.VueViteLink")
        }}</a>
        {{ t("Layout.Footer.PoweredByText") }}丨
        <a
          href="https://element-plus.org/"
          title="Element Plus官网"
          alt="Element Plus官网"
          target="_blank"
          >{{ t("Layout.Footer.ElementPlusLink") }}</a
        >
        <p>
          {{ t("Layout.Footer.OriginalProjectText") }}
          <a href="https://github.com/sun0225SUN/star-trail" target="_blank">star-trail</a>
          {{ t("Layout.Footer.ModifiedFromText") }}
          <a href="https://github.com/sun0225SUN" target="_blank">sun0225SUN</a>,
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
