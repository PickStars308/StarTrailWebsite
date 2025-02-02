<template>
  <div class="DialogOut" v-if="dialogVisible" @click.self="startCloseDialog">
    <div :class="['DialogView', { 'fade-out': isClosing }]">
      <div class="dialog-header">
        <h3>{{ $t("Settings.Setting") }}</h3>
        <el-button @click="startCloseDialog" class="close-btn">X</el-button>
      </div>

      <div class="LanguageSet">
        <h3>{{ $t("Settings.LanguageSetting") }}</h3>
        <el-select
          v-model="selectedLanguage"
          placeholder="Select Language"
          class="language-dropdown"
        >
          <el-option label="English" value="EnUs"></el-option>
          <el-option label="中文" value="ZhCN"></el-option>
        </el-select>
      </div>
      <p>Selected Language: {{ selectedLanguageLabel }}</p>
      <!-- Display the selected language -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick } from "vue";

import { ref, watch, computed } from "vue";

import { useMainStore } from "../stores";
import { useI18n } from "vue-i18n";

const store = useMainStore();
const dialogVisible = ref(store.getShowDialog);

const selectedLanguage = ref(localStorage.getItem("SelectedLanguage") || "EnUs");

const isClosing = ref(false); // Track if dialog is closing

// Watch for changes to dialog visibility
watch(
  () => store.getShowDialog,
  (newValue) => {
    dialogVisible.value = newValue;
    if (newValue) {
      isClosing.value = false; // Reset closing state when opening the dialog
    }
  },
);

// Start the close dialog process (trigger fade-out animation)
const startCloseDialog = () => {
  isClosing.value = true;
  // Wait for the fade-out animation to finish before hiding the dialog
  setTimeout(() => {
    dialogVisible.value = false;
    store.setShowDialog(false); // Assuming you have a setter in your store
  }, 300); // Duration of the fade-out animation (0.3s)
};

const { locale } = useI18n();

const selectedLanguageLabel = computed(() => {
  store.setLanguage(selectedLanguage.value);

  locale.value = selectedLanguage.value;

  return selectedLanguage.value === "EnUs" ? "English" : "中文";
});
</script>

<style lang="scss">
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
