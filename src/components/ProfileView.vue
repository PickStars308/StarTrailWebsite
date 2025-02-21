<template>
  <div class="AboutMe">
    <img
      class="Avatar"
      src="https://q2.qlogo.cn/headimg_dl?dst_uin=1402832033&spec=640"
      alt="Avatar"
    />

    <!-- 动态渲染中英对照内容 -->
    <div v-for="(item, index) in profileData" :key="index" class="ProfileItem">
      <p class="Zh" v-html="item.Zh"></p>
      <p class="En" v-html="item.En"></p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { ElNotification } from "element-plus";

// 定义数据类型
interface ProfileItem {
  Zh: string;
  En: string;
}

// 定义响应式数据
const profileData = ref<ProfileItem[]>([]);

// 异步获取个人介绍数据
const fetchProfileData = async () => {
  try {
    const response = await axios.get("/assets/Data/Json/Profile.json"); // 修改为你的 JSON 文件路径
    if (Array.isArray(response.data)) {
      profileData.value = response.data;
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
  fetchProfileData();
});
</script>

<style scoped lang="scss">
.AboutMe {
  font-size: 17px;

  .ProfileItem {
    margin-top: 5px;
    letter-spacing: 2px;
    line-height: 2.2;

    .Zh {
    }

    .En {
      font-size: 14px;
    }
  }

  .ProfileItem :deep(b) {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.28);
    background-color: #333;
    border-radius: 10px;
    padding: 5px 1%;
    margin: 5px;
  }
}
</style>
