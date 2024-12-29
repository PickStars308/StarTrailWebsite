<template>
  <div class="clear">
    <a v-for="friend in friends" :key="friend.name" href="#" target="_blank">
      <div class="item">
        <div class="avatar">
          <img :src="friend.avatar" />
          <!-- 使用 :src 进行动态绑定 -->
        </div>
        <div class="inner">
          <h5>{{ friend.name }}</h5>
          <p>{{ friend.description }}</p>
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
      friends: [] as Array<{
        name: string;
        description: string;
        avatar: string;
      }>, // 定义友人的类型
    };
  },
  mounted() {
    this.fetchFriends();
  },
  methods: {
    async fetchFriends() {
      try {
        const response = await axios.get("./assets/Data/Json/Friends.json");
        if (Array.isArray(response.data)) {
          this.friends = response.data;
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

<style scoped>
/* 您可以在这里添加样式 */
</style>
