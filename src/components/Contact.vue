<template>
  <div class="clear">
    <a
      v-for="contact in contacts"
      :key="contact.name"
      :href="contact.link"
      target="_blank"
    >
      <div class="item">
        <div class="bg" :style="{ backgroundColor: contact.bgColor }"></div>
        <div class="inner">
          <i :class="contact.iconClass"></i>
          <span>{{ contact.name }}</span>
        </div>
      </div>
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { ElNotification } from "element-plus";

export default defineComponent({
  data() {
    return {
      contacts: [] as Array<{
        name: string;
        link: string;
        bgColor: string;
        iconClass: string;
      }>, // 定义联系人的类型
    };
  },
  mounted() {
    this.fetchContacts();
  },
  methods: {
    async fetchContacts() {
      try {
        const response = await axios.get("./assets/Data/Json/Contacts.json"); // 假设 JSON 文件路径
        if (Array.isArray(response.data)) {
          this.contacts = response.data;
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
    },
  },
});
</script>
