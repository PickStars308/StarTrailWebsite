<template>
  <div v-if="dialogVisible" class="DialogOut" @click.self="startCloseDialog">
    <div :class="['DialogView', { 'fade-out': isClosing }]" @wheel.prevent>
      <div class="dialog-header">
        <h3>{{ t("Settings.Setting") }}</h3>
        <el-button @click="startCloseDialog" class="close-btn">X</el-button>
      </div>

      <div class="LanguageSet">
        <h3>{{ t("Settings.LanguageSetting") }}</h3>
        <el-select
          v-model="selectedLanguage"
          class="language-dropdown"
          placeholder="Select Language"
        >
          <el-option label="English" value="EnUs"></el-option>
          <el-option label="中文" value="ZhCN"></el-option>
        </el-select>
      </div>
      <p>{{ t("Settings.SelectedLanguage") }}{{ selectedLanguageLabel }}</p>
      <!-- Display the selected language -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

import { useMainStore } from "../stores";
import { useI18n } from "vue-i18n";

const { t } = useI18n(); // 解构出t方法

const store = useMainStore();
const dialogVisible = ref(store.getShowDialog);

const selectedLanguage = ref(localStorage.getItem("SelectedLanguage") || "EnUs");

const isClosing = ref(false);

watch(
  () => store.getShowDialog,
  (newValue) => {
    dialogVisible.value = newValue;
    if (newValue) {
      isClosing.value = false;

      // 禁用鼠标滚动
      document.documentElement.style.overflow = "hidden";
    }
  },
);

const startCloseDialog = () => {
  isClosing.value = true;

  document.documentElement.style.overflow = "scroll";

  setTimeout(() => {
    dialogVisible.value = false;

    store.setShowDialog(false);
  }, 300);
};

const { locale } = useI18n();

const selectedLanguageLabel = computed(() => {
  store.setLanguage(selectedLanguage.value);

  locale.value = selectedLanguage.value;

  return selectedLanguage.value === "EnUs" ? "English" : "中文";
});
</script>

<style lang="scss" scoped>
.DialogOut {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;

  .DialogView {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    background: rgb(255 255 255 / 27%);
    border-radius: 6px;
    padding: 40px;
    opacity: 0; /* Initially hidden */
    animation: fadeIn 0.3s forwards; /* Animation for appearing */

    /* Animation for disappearing */
    &.fade-out {
      animation: fadeOut 0.3s forwards;
    }

    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h3 {
        margin: 0;
        font-size: 1.5em;
      }

      .close-btn {
        background: none;
        color: #ffffff;
        border: none;
        font-size: 1.5em;
        cursor: pointer;
      }
    }

    .LanguageSet {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .language-dropdown {
        width: 200px;
      }
    }
  }
}

/* Fade-in effect */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

/* Fade-out effect */
@keyframes fadeOut {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
}
</style>
