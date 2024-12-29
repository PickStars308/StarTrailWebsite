<script lang="ts">
import axios from "axios";
import { ElNotification } from "element-plus";
import { onMounted, ref } from "vue";

interface MenuItem {
  use: boolean; // 添加 use 属性
  link: string;
  name: string;
  target: string;
}

export default {
  setup() {
    const menuItems = ref<MenuItem[]>([]);

    const fetchMenuData = async () => {
      try {
        const response = await axios.get<MenuItem[]>(
          "./assets/Data/Json/Menu.json"
        );
        if (Array.isArray(response.data)) {
          menuItems.value = response.data;
        } else {
          throw new TypeError("获取的数据格式不正确!");
        }
      } catch (error) {
        ElNotification({
          dangerouslyUseHTMLString: true,
          customClass: "ElNotification",
          title: "提示",
          message: `数据加载失败 Σヽ(ﾟД ﾟ; )ﾉ <br/>${error}`,
          type: "error",
        });
      }
    };

    const showMaintenanceMessage = (name: string) => {
      ElNotification({
        title: "提示",
        message: `${name} 正在维护中，请稍后再试！`,
        type: "warning",
      });
    };

    onMounted(fetchMenuData); // 组件挂载时调用数据获取函数

    return {
      menuItems,
      showMaintenanceMessage,
    };
  },
};
</script>

<template>
  <nav>
    <div v-for="item in menuItems" :key="item.link">
      <a v-if="item.use" :href="item.link" :target="item.target">
        {{ item.name }}
      </a>

      <span
        v-else
        style="cursor: pointer; color: gray"
        @click="showMaintenanceMessage(item.name)"
      >
        {{ item.name }}
      </span>
    </div>
  </nav>
</template>
