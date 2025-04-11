import router from "@/router/index";
import { getToken } from "@/utils/auth";

// 全局路由前置守卫
router.beforeEach((to, from, next) => {
  console.log("==> 全局路由前置守卫");
  let token = getToken();
  if (!token && to.path.startsWith("/admin")) {
    ElMessage.warning("请先登录");
    next({ path: "/login" });
  } else {
    next();
  }
});

// 全局路由后置守卫
router.afterEach((to, from) => {
  // 动态设置页面 Title
  let title = (to.meta.title ? to.meta.title : "") + " - Weblog";
  document.title = title;
});
