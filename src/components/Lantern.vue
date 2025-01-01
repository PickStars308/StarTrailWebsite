<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { ElNotification } from "element-plus";

// 定义数据
const texts = ref(["新", "年", "快", "乐"]); // 默认值
const lanternConfig = ref({
  Enable: false,
  String: "新|年|快|乐", // 默认文字
});

// 获取配置数据的方法
const fetchLanternConfig = async () => {
  try {
    const response = await axios.get("./assets/Data/Json/Config.json"); // JSON 文件路径
    const data = response.data?.Lantern;

    if (data) {
      lanternConfig.value = data;

      if (lanternConfig.value.Enable) {
        texts.value = lanternConfig.value.String.split("|"); // 用竖线分隔字符串
        ElNotification({
          title: "提升",
          message: `祝各位新年快乐~`,
          type: "info",
        });
      } else {
      }
    } else {
      ElNotification({
        title: "提示",
        message: "获取的配置数据格式不正确。",
        type: "warning",
      });
    }
  } catch (error) {
    ElNotification({
      title: "错误",
      message: `数据加载失败 Σヽ(ﾟД ﾟ; )ﾉ <br/>${error}`,
      type: "error",
      dangerouslyUseHTMLString: true, // 启用 HTML 渲染
    });
  }
};

// 挂载时调用数据加载
onMounted(() => {
  fetchLanternConfig();
});
</script>

<template>
  <div v-show="lanternConfig.Enable">
    <div
      v-for="(text, index) in texts"
      :key="index"
      :class="`deng-box${index}`"
    >
      <div class="deng">
        <div class="xian"></div>
        <div class="deng-a">
          <div class="deng-b">
            <div class="deng-t">{{ text }}</div>
          </div>
        </div>
        <div class="shui shui-a">
          <div class="shui-c"></div>
          <div class="shui-b"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* 主灯笼容器位置设置 */
.deng-box0 {
  position: fixed;
  top: -30px;
  left: 10px;
  z-index: 1;
  pointer-events: none;
}

.deng-box1 {
  position: fixed;
  top: -40px;
  left: 150px;
  z-index: 1;
  pointer-events: none;
}

.deng-box2 {
  position: fixed;
  top: -40px;
  right: 150px;
  z-index: 1;
  pointer-events: none;
}

.deng-box3 {
  position: fixed;
  top: -30px;
  right: 10px;
  z-index: 1;
  pointer-events: none;
}

/* 灯笼样式 */
.deng {
  position: relative;
  width: 120px;
  height: 90px;
  margin: 50px;
  background: rgba(216, 0, 15, 0.8);
  border-radius: 50% 50%;
  transform-origin: 50% -100px;
  animation: swing 3s infinite ease-in-out;
  box-shadow: -5px 5px 50px 4px #fa6c00;

  &:before,
  &:after {
    position: absolute;
    content: " ";
    display: block;
    border-radius: 5px 5px 0 0;
    border: solid 1px #dc8f03;
    background: linear-gradient(to right, #dc8f03, orange, #dc8f03);
  }

  &:before {
    top: -7px;
    left: 29px;
    height: 12px;
    width: 60px;
  }

  &:after {
    bottom: -7px;
    left: 10px;
    height: 12px;
    width: 60px;
    margin-left: 20px;
  }
}

.deng-a {
  width: 100px;
  height: 90px;
  background: rgba(216, 0, 15, 0.1);
  margin: 12px 8px;
  border-radius: 50% 50%;
  border: 2px solid #dc8f03;
}

.deng-b {
  width: 45px;
  height: 90px;
  background: rgba(216, 0, 15, 0.1);
  margin: -4px 8px 8px 26px;
  border-radius: 50% 50%;
  border: 2px solid #dc8f03;
}

.deng-t {
  font-family: "黑体", Arial, "Lucida Grande", Tahoma, sans-serif;
  font-size: 3.2rem;
  color: #dc8f03;
  font-weight: 700;
  line-height: 85px;
  text-align: center;
}

.xian {
  position: absolute;
  top: -20px;
  left: 60px;
  width: 2px;
  height: 20px;
  background: #dc8f03;
}

.shui-a {
  position: relative;
  width: 5px;
  height: 20px;
  margin: -5px 0 0 59px;
  animation: swing 4s infinite ease-in-out;
  transform-origin: 50% -45px;
  background: orange;
  border-radius: 0 0 5px 5px;
}

.shui-b {
  position: absolute;
  top: 14px;
  left: -2px;
  width: 10px;
  height: 10px;
  background: #dc8f03;
  border-radius: 50%;
}

.shui-c {
  position: absolute;
  top: 18px;
  left: -2px;
  width: 10px;
  height: 35px;
  background: orange;
  border-radius: 0 0 0 5px;
}

@keyframes swing {
  0% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(-10deg);
  }
}
</style>
