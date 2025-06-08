<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isFold ? '60px': '200px'">
        <!-- 父传子 -->
        <MainMenu :is-fold="isFold"/>
      </el-aside>
      <el-container>
        <el-header height="50px">
          <!-- 子传父 -->
          <MainHeader @change-fold="handleChangeFold" />
        </el-header>
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MainMenu from '@/components/main-menu/main-menu.vue';
import MainHeader from '@/components/main-header/main-header.vue';


/** 状态定义等 */
const isFold = ref(false) // 折叠状态


/** 事件处理函数 */
// 处理main-header遮挡变化
function handleChangeFold(isFlag:boolean){
  isFold.value = isFlag // 父组件状态isFold 子组件传递参数isFlag
}

</script>

<style lang="less" scoped>
.main {
  height: 100%;
}

.main-content {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.3s linear; /* 折叠动画 */
    // 兼容选项
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    // 删除滚动条
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    background-color: #f0f2f5;
  }
}
</style>