<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

import { ElNotification } from "element-plus";

// 定义响应数据的类型
interface PoemData {
  title: string;
  chaodai: string;
  zuozhe: string;
  chuzi: string;
  url: string;
}

// 响应式数据
const poem = ref<PoemData | null>(null);

// 请求古诗词接口
const fetchPoem = async () => {
  try {
    const response = await axios.get("https://www.meiriyiyan.com/api/v1/");
    poem.value = response.data;
  } catch (error) {
    ElNotification({
      title: "错误",
      message: `数据加载失败 Σヽ(ﾟД ﾟ; )ﾉ <br/>${error}`,
      type: "error",
      dangerouslyUseHTMLString: true, // 启用 HTML 渲染
    });
  }
};

// 页面加载时请求数据
onMounted(() => {
  fetchPoem();
});
</script>

<template>
  <div class="SectionTitle">
    <div v-if="poem" class="poem">
      <Typed :typedList="[poem.title]" :loop="false" :speed="100"/>
    </div>
    <div v-else class="loading">正在加载...</div>
  </div>
</template>

<style scoped lang="scss"></style>
