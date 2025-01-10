<script setup lang="ts">
const props = defineProps({
  lanternStrings: {
    type: String,
    required: true,
  },
});

// 将字符串分割为数组
const lanternArray = props.lanternStrings.split("|");
</script>

<template>
  <div class="LanternBox">
    <div v-for="(text, index) in lanternArray" :key="index">
      <!-- 灯笼1 - 新 -->
      <div :class="'deng-box' + index">
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
  </div>
</template>

<style lang="scss">
@use "@/assets/Style/Lantern.scss";
</style>
