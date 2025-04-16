// import './assets/main.css'
import "@/assets/main.css";
import { createApp } from "vue";
import App from "@/App.vue";
import "animate.css";
import "nprogress/nprogress.css";

// 导入路由
import router from "@/router";
// 导入全局路由守卫
import "@/permission";

// 导入 Element Plus 图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// 引入全局状态管理 Pinia
import { createPinia } from "pinia";

const pinia = createPinia();

const app = createApp(App);
// 引入图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 应用路由
app.use(router);
app.use(pinia);
app.mount("#app");
