import router from "@/router/index";
import { getToken } from "@/utils/cookie";
import { showPageLoading, hidePageLoading } from "@/utils/util";
// 全局路由前置守卫
router.beforeEach((to, from, next) => {
  console.log("==> 全局路由前置守卫");
  showPageLoading(); // 显示页面加载 Loading
  const token = getToken();
  if (!token && to.path.startsWith("/admin")) {
    ElMessage.warning("请先登录");
    next({ path: "/login" });
  } else if (token && to.path == "/login") {
    // 若用户已经登录，且重复访问登录页
    ElMessage.warning("请勿重复登录");
    // 跳转后台首页
    next({ path: "/admin/index" });
  } else {
    next();
  }
});

// 全局路由后置守卫
router.afterEach((to, _from) => {
  // 动态设置页面 Title
  const title = (to.meta.title ? to.meta.title : "") + " - Weblog";
  document.title = title;
  hidePageLoading(); // 隐藏页面加载 Loading
});
