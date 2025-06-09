<template>
  <div class="header-breadcrumb">
    <!-- separator-icon分割符: 图标组件 -->
    <el-breadcrumb :separator-icon="ArrowRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useLoginStore } from '@/store/login/login';
import { mapPathToBreadcrumbs } from '@/utils/map-menus';
import { ArrowRight } from '@element-plus/icons-vue'
import { computed } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()
const userMenu = useLoginStore().userMenu
// 计算属性: 内部依赖path/userMenu如果发生改变就会重新计算
const breadcrumbs = computed(() => {
  return mapPathToBreadcrumbs(route.path, userMenu)
}) 
</script>

<style lang="less" scoped></style>