<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <!-- 比v-if更加简单的html结构是动态组件component -->
      <el-icon size="28px">
        <!-- 注意: 例如当前处于折叠状态isFold=true,显示的图标应为Expand(展开),这样点击进入'展开'状态 -->
        <component :is="isFold ? 'Expand' : 'Fold'"></component>
      </el-icon>
    </div>
    <div class="content">
      <!-- Nav面包屑组件Breadcrumb -->
      <div class="breadcrumb">
        <header-breadcrumb/>
      </div>
      <div class="info">
        <header-info />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HeaderBreadcrumb from './cpns/header-breadcrumb.vue';
import headerInfo from './cpns/header-info.vue';


/** 子传父: 定义emit */
const emit = defineEmits(['changeFold'])

/** 定义状态等 */
const isFold = ref(false)


/** 事件处理 */
function handleMenuIconClick() {
  isFold.value = !isFold.value
  // 子传父,传递监听changeFold函数和参数isFold
  emit('changeFold', isFold.value)
}

</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>