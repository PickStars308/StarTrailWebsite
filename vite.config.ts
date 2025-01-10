import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { resolve } from 'path'

import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default ({ mode }) =>
  defineConfig({
    css: {
      // css预处理器
      preprocessorOptions: {
        scss: {
          // Use @use to include global styles or mixins
          additionalData: "@use \"@/assets/Style/Mixin\" as *;",
        },
      },
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      // viteCompression(
      // {
      //   // 配置项
      //   verbose: true, // 是否在控制台输出压缩结果
      //   disable: false, // 是否禁用压缩
      //   threshold: 10240, // 文件大小超过此值时进行压缩，单位为字节
      //   algorithm: "gzip", // 压缩算法，可选 'gzip' 或 'brotli'
      //   ext: ".gz", // 压缩后的文件扩展名
      // }
      // ),
      VitePWA({
        registerType: "autoUpdate",
        workbox: {
          skipWaiting: true,
          clientsClaim: true,
          runtimeCaching: [
            {
              urlPattern: /(.*?)\.(js|css|woff2|woff|ttf)/, // js / css 静态资源缓存
              handler: "CacheFirst",
              options: {
                cacheName: "js-css-cache",
              },
            },
            {
              urlPattern: /(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/, // 图片缓存
              handler: "CacheFirst",
              options: {
                cacheName: "image-cache",
              },
            },
          ],
        },
        manifest: {
          name: loadEnv(mode, process.cwd()).VITE_SITE_NAME,
          short_name: loadEnv(mode, process.cwd()).VITE_SITE_NAME,
          description: loadEnv(mode, process.cwd()).VITE_SITE_DES,
          display: "standalone",
          start_url: "/",
          theme_color: "#424242",
          background_color: "#424242",
          icons: [
            {
              src: "/images/icon/48.png",
              sizes: "48x48",
              type: "image/png",
            },
            {
              src: "/images/icon/72.png",
              sizes: "72x72",
              type: "image/png",
            },
            {
              src: "/images/icon/96.png",
              sizes: "96x96",
              type: "image/png",
            },
            {
              src: "/images/icon/128.png",
              sizes: "128x128",
              type: "image/png",
            },
            {
              src: "/images/icon/144.png",
              sizes: "144x144",
              type: "image/png",
            },
            {
              src: "/images/icon/192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/images/icon/512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
      }),
    ],
    resolve: {
      // 设置路径别名
      alias: {
        "@": resolve(__dirname, "./src"),
        "*": resolve(""),
      },
    },
    build: {
      chunkSizeWarningLimit: 1000,
      minify: "terser",
      terserOptions: {
        compress: {
          pure_funcs: ["console.log"],
        },
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            // 按照模块路径分割大模块
            if (id.includes("node_modules")) {
              return "vendor"; // 将所有依赖的 node_modules 打包成一个单独的 chunk
            }
          },
        },
      },
    },
  })
