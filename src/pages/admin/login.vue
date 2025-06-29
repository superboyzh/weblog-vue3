<template>
  <div class="grid grid-cols-2 h-screen">
    <!-- 默认占两列，order 用于指定排列顺序，md 用于适配非移动端（PC 端） -->
    <div class="col-span-2 order-2 p-10 md:col-span-1 md:order-1 bg-slate-900">
      <!-- 指定为 flex 布局，并设置为屏幕垂直水平居中，高度为 100% -->
      <div class="flex justify-center items-center h-full flex-col animate__animated animate__bounceInLeft animate__fast">
        <h2 class="font-bold text-4xl mb-7 text-white">Weblog 博客登录</h2>
        <p class="text-white">一款由 Spring Boot + Mybaits Plus + Vue 3.2 + Vite 4 开发的前后端分离博客。</p>
        <!-- 指定图片宽度为父级元素的 1/2 -->
        <img src="@/assets/background.png" class="w-1/2 mt-10" />
      </div>
    </div>
    <div class="col-span-2 order-1 md:col-span-1 md:order-2 bg-white">
      <!-- flex-col 用于指定子元素垂直排列 -->
      <div class="flex justify-center items-center h-full flex-col animate__animated animate__bounceInRight animate__fast">
        <!-- 大标题，设置字体粗细、大小、下边距 -->
        <h1 class="font-bold text-4xl mb-5">欢迎回来</h1>
        <!-- 设置 flex 布局，内容垂直水平居中，文字颜色，以及子内容水平方向 x 轴间距 -->
        <div class="flex items-center justify-center mb-7 text-gray-400 space-x-2">
          <!-- 左边横线，高度为 1px, 宽度为 16，背景色设置 -->
          <span class="h-[1px] w-16 bg-gray-200"></span>
          <span>账号密码登录</span>
          <!-- 右边横线 -->
          <span class="h-[1px] w-16 bg-gray-200"></span>
        </div>
        <!-- 引入 Element Plus 表单组件，移动端设置宽度为 5/6，PC 端设置为 2/5 -->
        <el-form class="w-5/6 md:w-2/5" ref="formRef" :rules="rules" :model="form">
          <el-form-item prop="username">
            <!-- 输入框组件 -->
            <el-input v-model="form.username" size="large" placeholder="请输入用户名" :prefix-icon="User" clearable />
          </el-form-item>
          <el-form-item prop="password">
            <!-- 密码框组件 -->
            <el-input v-model="form.password" size="large" type="password" placeholder="请输入用户名" :prefix-icon="Lock" clearable show-password />
          </el-form-item>
          <el-form-item>
            <!-- 登录按钮，宽度设置为 100% -->
            <el-button class="w-full" size="large" type="primary" @click="onSubmit" :loading="loading">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { User, Lock } from "@element-plus/icons-vue";
import { login } from "@/api/admin/user";
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { setToken } from "@/utils/cookie";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
// 定义响应式的表单对象
const form = reactive({
  username: "admin",
  password: "admin"
});
// 定义路由对象
const router = useRouter();
const loading = ref(false);
// 表单引用
const formRef = ref(null);
// 表单验证规则
const rules = {
  username: [
    {
      required: true,
      message: "用户名不能为空",
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      message: "密码不能为空",
      trigger: "blur"
    }
  ]
};

const onSubmit = () => {
  // 先验证 form 表单字段
  formRef.value.validate((valid) => {
    if (!valid) {
      console.log("表单验证不通过");
      return false;
    }
    loading.value = true;
    // 调用登录接口
    login(form.username, form.password)
      .then((res) => {
        // 判断是否成功
        if (res.success) {
          setToken(res.data.token);
          // 获取用户信息，并存储到全局状态中
          userStore.setUserInfo();
          ElMessage.success("登录成功");
          // 跳转到后台首页
          router.push("/admin/index");
        } else {
          form.password = "";
          // 提示错误信息
          ElMessage.error(res.message);
        }
      })
      .finally(() => {
        // 无论成功与否都要关闭 loading
        loading.value = false;
      });
  });
};

// 按回车键后，执行登录事件
function onKeyUp(e) {
  if (e.key == "Enter") {
    onSubmit();
  }
}

// 添加键盘监听
onMounted(() => {
  document.addEventListener("keyup", onKeyUp);
});

// 移除键盘监听
onBeforeUnmount(() => {
  document.removeEventListener("keyup", onKeyUp);
});
</script>
