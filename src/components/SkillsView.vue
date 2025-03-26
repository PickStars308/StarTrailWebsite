<script lang="ts" setup>
import { useMainStore } from "@/stores/index";
import http from "@/Utils/Axios";

import { ElNotification } from "element-plus";
import { onMounted, ref } from "vue";

const userStore = useMainStore();

// 定义 Skill 类型
interface Skill {
  name: string;
  progress: number;
  description: string;
}

const skills = ref<Skill[]>([]); // 指定 skills 的类型为 Skill[]

// 获取技能数据的函数
async function fetchSkills() {
  try {
    const response = await http.get("/assets/Data/Json/Skills.json");
    if (Array.isArray(response.data)) {
      skills.value = response.data;
      userStore.setLoading(false);
    } else {
      ElNotification({
        title: "提示",
        message: "获取的数据格式不正确",
        type: "warning",
      });
    }
  } catch (error) {
    ElNotification({
      title: "提示",
      message: `数据加载失败 Σヽ(ﾟД ﾟ; )ﾉ <br/>${error}`,
      type: "error",
    });
  }
}

onMounted(fetchSkills); // 组件挂载时调用数据获取函数
</script>

<template>
  <ul class="Clear Skill" :class="[{ hidden: userStore.isLoading }]">
    <li v-for="(skill, index) in skills" :key="index">
      <p>{{ skill.name }}</p>
      <div class="progress">
        <div :style="{ width: `${skill.progress}%` }" />
        <span>{{ skill.description }}</span>
      </div>
    </li>
  </ul>
</template>

<style scoped></style>
