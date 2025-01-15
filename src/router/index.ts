import { createMemoryHistory, createRouter, createWebHistory } from "vue-router";

// 路由配置
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta: {
      title: "首页",
      requiresAuth: true, // 是否需要登录
    },
  },
];

// 创建路由实例
const router = createRouter({
  history: createMemoryHistory(), // 使用 history 模式
  routes,
});

export default router;
