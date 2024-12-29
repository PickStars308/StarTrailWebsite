import path from "node:path";
import vue from "@vitejs/plugin-vue";

import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig, loadEnv } from "vite";

import { visualizer } from "rollup-plugin-visualizer";

import viteCompression from "vite-plugin-compression";

// https://vite.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
  },
  plugins: [
    vue(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
    }),
    visualizer({
      emitFile: false,
      filename: "stats.html", // 使用正确的属性名
      open: true,
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: true,
        }),
      ],
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://g-wluz2572.coding.net", // 目标地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // 在路径中替换前缀
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // 配置 @ 指向 src 目录
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        // additionalData: `@import "./src/style/global.scss";`,
      },
    },
  },
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks(id) {
  //         if (id.includes("node_modules")) {
  //           return id.toString().split("node_modules/")[1].split("/")[0]; // 按库名分割
  //         }
  //       },
  //     },
  //   },
  //   chunkSizeWarningLimit: 10240, // 自定义警告阈值为 1000 kB
  // },
});
