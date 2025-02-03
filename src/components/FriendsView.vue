<script lang="ts" setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { ElNotification } from "element-plus";

// 定义友人数据类型
interface Friend {
  Name: string;
  Description: string;
  Avatar: string;
}

// 定义响应式数据
const friends = ref<Friend[]>([]);

// 异步获取友人数据
const fetchFriends = async () => {
  try {
    const response = await axios.get("/assets/Data/Json/Friends.json");
    if (Array.isArray(response.data)) {
      friends.value = response.data;
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
  fetchFriends();
});
</script>

<template>
  <div class="clear">
    <a v-for="friend in friends" :key="friend.Name" href="#" target="_blank">
      <div class="item">
        <div class="avatar">
          <img :src="friend.Avatar" />
          <!-- 使用 :src 进行动态绑定 -->
        </div>
        <div class="inner">
          <h5 v-html="friend.Name"></h5>
          <p>{{ friend.Description }}</p>
        </div>
      </div>
    </a>
  </div>
</template>

<style scoped>
/* 您可以在这里添加样式 */
</style>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FriendsView",
});
</script>
