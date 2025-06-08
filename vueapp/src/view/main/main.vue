<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside width="200px">
        <MainMenu />
      </el-aside>
      <el-container>
        <el-header height="80px">
          <MainHeader />
        </el-header>
        <el-main>Main
          <button @click="handleExitClick">退出登录</button></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants';
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router';

import MainMenu from '@/components/main-menu/main-menu.vue';
import MainHeader from '@/components/main-header/main-header.vue';

const router = useRouter()


/** 事件处理函数 */
function handleExitClick() {
  // 1.删除token
  localCache.removeCache(LOGIN_TOKEN)
  // 2.跳回/login
  router.push('/login')
}

</script>

<style lang="less" scoped>
.main {
  height: 100%;
  color: red;
}

.main-content {
  height: 100%;
}

.el-aside {
  background-color: yellowgreen;
}

.el-header {
  background-color: aquamarine;
}

.el-main {
  background-color: aqua;
}
</style>