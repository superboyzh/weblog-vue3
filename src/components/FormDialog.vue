<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    :width="width"
    :destroy-on-close="destroyOnClose"
    :draggable="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit" :loading="btnLoading">
          {{ confirmText }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from "vue";
// 对外暴露属性
const props = defineProps({
  title: String, // 字段类型
  width: {
    type: String,
    default: "40%" // 默认值
  },
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  confirmText: {
    type: String,
    default: "提交"
  }
});
const btnLoading = ref(false); // 确认按钮加载 loading
// 显示 loading
const showBtnLoading = () => (btnLoading.value = true);
// 隐藏 loading
const closeBtnLoading = () => (btnLoading.value = false);

const dialogVisible = ref(false);

// 打开
const open = () => (dialogVisible.value = true);
// 关闭
const close = () => (dialogVisible.value = false);

// 对外暴露一个 submit 方法
const emit = defineEmits(["submit"]);
const submit = () => emit("submit");

// 暴露给父组件
defineExpose({
  open,
  close,
  showBtnLoading,
  closeBtnLoading
});
</script>
