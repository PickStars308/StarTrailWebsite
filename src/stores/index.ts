import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    isLoading: true,
    isShowBackGroundError: false,
    Locales: localStorage.getItem("SelectedLanguage") || "EnUs",
    ShowDialog: false,
  }),
  actions: {
    setLanguage(language: string) {
      localStorage.setItem("SelectedLanguage", language);
      this.Locales = language; // 直接修改 state，无需使用 this.$state
    },
    setLoading(isLoading: boolean) {
      this.isLoading = isLoading; // 直接修改 state
    },
    setShowBackGroundError(isShowBackGroundError: boolean) {
      this.isShowBackGroundError = isShowBackGroundError; // 直接修改 state
    },
    setShowDialog(ShowDialog: boolean) {
      this.ShowDialog = ShowDialog; // 直接修改 state
    },
  },
  getters: {
    // 重命名 getter，避免与 state 属性冲突
    getIsLoading: (state) => state.isLoading,
    getLanguage: (state) => state.Locales,
    getCurrentLanguage: (state) => state.Locales, // 重命名以避免重复
    getShowDialog: (state) => state.ShowDialog,
  },
});
