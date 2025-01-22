<template>
  <nav>
    <div
      v-for="item in navItems"
      :key="item.Name"
      :class="{ disabled: !item.Use }"
      @click="handleNavClick(item)"
    >
      <a v-if="item.Use" :href="item.Link" :target="item.Target">{{ item.Name }}</a>

      <a v-else :target="item.Target">{{ item.Name }}</a>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { ElNotification } from "element-plus";

// 定义导航项数据类型
interface NavItem {
  Use: boolean;
  Name: string;
  Link: string;
  Target: string;
}

// 响应式数据，存储导航项
const navItems = ref<NavItem[]>([]);

// 异步获取导航项数据
const fetchNavItems = async () => {
  try {
    const response = await axios.get("/assets/Data/Json/NavItems.json");
    if (Array.isArray(response.data)) {
      navItems.value = response.data;
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
};

// 在组件挂载后获取数据
onMounted(() => {
  fetchNavItems();
});

// 点击导航项的处理函数
const handleNavClick = (item: NavItem) => {
  if (!item.Use) {
    ElNotification({
      title: "维护中",
      message: `${item.Name} 正在维护，请稍后再试！`,
      type: "warning",
    });
  }
};
</script>

<style scoped lang="scss"></style>
