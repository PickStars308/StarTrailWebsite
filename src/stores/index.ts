import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    isLoading: true,
    isShowBackGroundError: false,
  }),
  actions: {
    setLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },
    setShowBackGroundError(isShowBackGroundError: boolean) {
      this.isShowBackGroundError = isShowBackGroundError;
    },
  },
});
