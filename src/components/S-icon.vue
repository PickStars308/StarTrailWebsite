<script setup lang="ts">
// 引入 Iconify 的 Icon 组件
import { Icon } from "@iconify/vue";

// 定义 props
defineProps({
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "", // 设置默认值为空字符串
  },
});
</script>

<template>
  <!-- 将 icon 和 color 传递给 Iconify 组件 -->
  <Icon :icon="icon" :style="{ color: color }" />
</template>
