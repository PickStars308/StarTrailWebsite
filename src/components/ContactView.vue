<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { ElNotification } from "element-plus";
import http from "@/Utils/Axios";


// 定义联系人数据类型
interface Contact {
  name: string;
  link: string;
  bgColor: string;
  iconClass: string;
}

// 定义响应式数据
const contacts = ref<Contact[]>([]);

// 异步获取联系人数据
const fetchContacts = async () => {
  try {
    const response = await http.get("/assets/Data/Json/Contacts.json"); // 假设 JSON 文件路径
    if (Array.isArray(response.data)) {
      contacts.value = response.data;
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
  fetchContacts();
});
</script>

<template>
  <div class="clear">
    <a v-for="contact in contacts" :key="contact.name" :href="contact.link" target="_blank">
      <div class="item">
        <div class="bg" :style="{ backgroundColor: contact.bgColor }" />
        <div class="inner">
          <i :class="contact.iconClass">
            <SvgIcon :icon-name="contact.iconClass"></SvgIcon>
          </i>
          <span>{{ contact.name }}</span>
        </div>
      </div>
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContactView",
});
</script>
