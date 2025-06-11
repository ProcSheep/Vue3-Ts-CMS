<template>
  <div class="user">
    <!-- 接受子传父 -->
    <user-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <user-content ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick" />
    <!-- 添加用户弹出的模态框 -->
    <user-model ref="modelRef" />
  </div>
</template>

<script setup lang="ts" name="user">
import UserSearch from './cpns/user-search.vue';
import UserContent from './cpns/user-content.vue'
import UserModel from './cpns/user-model.vue'
import { ref } from 'vue';

// 获取user-content组件实例对象
const contentRef = ref<InstanceType<typeof UserContent>>()
// 执行子传父,同时接受参数
function handleQueryClick(formData: any) {
  contentRef.value?.fetchUserListData(formData)
}
function handleResetClick() {
  contentRef.value?.fetchUserListData()
}

// 新建用户数据 对user-model组件操作
const modelRef = ref<InstanceType<typeof UserModel>>()
function handleNewClick() {
  modelRef.value?.setModelVisable()
}

// 编辑用户数据
function handleEditClick(itemData: any){
  modelRef.value?.setModelVisable(false,itemData)
}

</script>

<style scoped>
.user {}
</style>
