<script lang="ts" setup>
import { useMainStore } from '@/stores/index'
import axios from 'axios'

import { ElNotification } from 'element-plus'
import { onMounted, ref } from 'vue'

const hitokotoContent = ref('既然选择远方，当不负青春，砥砺前行。')

// 获取技能数据的函数
async function fetchSkills() {
  try {
    axios({
      method: 'get',
      url: 'https://www.freeapis.cn/api/yulu/suiji',
      params: {
        key: 'pzwVU6YIiDCcaeFQGFn95OyvbG',
      },
      timeout: 3000,
    })
      .then((response) => {
        hitokotoContent.value = response.data
      })
      .catch((error) => {
        alert('Failed to load data.')

        hitokotoContent.value = `Failed to load data.${error}`
      })
  }
  catch (error) {
    ElNotification({
      title: '提示',
      message: `数据加载失败 Σヽ(ﾟД ﾟ; )ﾉ <br/>${error}`,
      type: 'error',
    })
  }
}

// 判断当前环境是开发环境还是生产环境
if (process.env.NODE_ENV === 'development') {
  console.log('当前是开发环境')
}
else if (process.env.NODE_ENV === 'production') {
  console.log('当前是生产环境')
  onMounted(fetchSkills)
}
</script>

<template>
  <div class="SectionTitle" v-html="hitokotoContent" />
</template>

<style scoped></style>
