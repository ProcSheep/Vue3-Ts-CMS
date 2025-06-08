<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="">
      <h2 class="title" v-show="!isFold">宏远管理系统</h2>
    </div>
    <!-- for循环遍历菜单,template属性一般不要添加'v-for :key'这种属性,加到标签上,否则会导致el组件功能异常 -->
    <el-menu :default-active="defaultActive" router :collapse="isFold" text-color="#b7bdc3" active-text-color="#fff" background-color="#001529">
      <el-sub-menu v-for="item in userMenu" :key="item.id" :index="String(item.id)">
        <template #title>
          <el-icon>
            <!-- 后端返回的图表数据类似"el-icon-setting"的字符串数据 -->
            <component :is="item.icon.split('-icon-')[1]" />
          </el-icon>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.url">
          {{ subItem.name }}
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { useLoginStore } from '@/store/login/login';
import {ref} from 'vue';
import { useRoute } from 'vue-router';

/** 父传子: 定义props */
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

// 1.获取动态菜单数据(从store/login中)
const loginStore = useLoginStore()
const userMenu = loginStore.userMenu

// 2.Menu的默认菜单
// 获取页面url,放入menu组件的属性default-active(默认选中的菜单项)
const route = useRoute()
const defaultActive = ref(route.path)


</script>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>