/// <reference types="vite/client" />
declare module "*.vue" {
  import { Component } from "vue";
  const component: Component;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_PICKSTARS_VERSION: string;
  readonly VITE_SITE_NAME: string;
  readonly VITE_SITE_KEYWORDS: string;
  readonly VITE_SITE_DES: string;
  readonly VITE_SITE_AUTHOR: string;
  readonly VITE_SITE_ICP: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ViteEnv extends ImportMetaEnv {}
