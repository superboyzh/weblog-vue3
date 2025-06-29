import Index from "@/pages/frontend/index.vue";
import { createRouter, createWebHashHistory } from "vue-router";

import Login from "@/pages/admin/login.vue";
import AdminIndex from "@/pages/admin/index.vue";
import Admin from "@/layouts/admin/admin.vue";

import AdminArticleList from "@/pages/admin/article-list.vue";
import AdminCategoryList from "@/pages/admin/category-list.vue";
import AdminTagList from "@/pages/admin/tag-list.vue";
import AdminBlogSetting from "@/pages/admin/blog-setting.vue";
import AdminBlogTest from "@/pages/admin/test.vue";

// 统一在这里声明所有路由
const routes = [
  {
    path: "/", // 路由地址
    component: Index, // 对应组件
    meta: {
      // meta 信息
      title: "Weblog 首页" // 页面标题
    }
  },
  {
    path: "/login", // 登录页
    component: Login,
    meta: {
      title: "Weblog 登录页"
    }
  },
  {
    path: "/admin", // 后台管理路由
    component: Admin, // 后台布局组件
    children: [
      {
        path: "/admin/index",
        component: AdminIndex, // 主内容区域，具体需要渲染的页面
        meta: {
          title: "Admin 后台首页"
        }
      },
      {
        path: "/admin/article/list",
        component: AdminArticleList,
        meta: {
          title: "文章管理"
        }
      },
      {
        path: "/admin/category/list",
        component: AdminCategoryList,
        meta: {
          title: "分类管理"
        }
      },
      {
        path: "/admin/tag/list",
        component: AdminTagList,
        meta: {
          title: "标签管理"
        }
      },
      {
        path: "/admin/blog/setting",
        component: AdminBlogSetting,
        meta: {
          title: "博客设置"
        }
      },
      {
        path: "/admin/blog/test",
        component: AdminBlogTest,
        meta: {
          title: "测试页面"
        }
      }
    ]
  }
];

// 创建路由
const router = createRouter({
  // 指定路由的历史管理方式，hash 模式指的是 URL 的路径是通过 hash 符号（#）进行标识
  history: createWebHashHistory(),
  // routes: routes 的缩写
  routes
});

// ES6 模块导出语句，它用于将 router 对象导出，以便其他文件可以导入和使用这个对象
export default router;
