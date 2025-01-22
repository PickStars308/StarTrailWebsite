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
      this.$state.Locales = language;
    },
    setLoading(isLoading: boolean) {
      this.$state.isLoading = isLoading;
    },
    setShowBackGroundError(isShowBackGroundError: boolean) {
      this.$state.isShowBackGroundError = isShowBackGroundError;
    },
    setShowDialog(ShowDialog: boolean) {
      this.$state.ShowDialog = ShowDialog;
    },
  },
  getters: {
    getLanguage: (state) => state.Locales,
    isLoading: (state) => state.isLoading,
    currentLanguage: (state) => state.Locales,
    getShowDialog: (state) => state.ShowDialog,
  },
});
