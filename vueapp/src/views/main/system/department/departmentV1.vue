<template>
  <div class="department">
    <PageSearch @query-click="handleQueryClick" @reset-click="handleResetClick"/>
    <PageContent ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick"/>
    <PageModel ref="modelRef"/>
  </div>
</template>

<script setup lang="ts" name="department">
import PageSearch from './cpns/page-search.vue';
import PageContent from './cpns/page-content.vue';
import PageModel from './cpns/page-model.vue';
import { ref } from 'vue';

/** search content内父子通信的操作 */
const contentRef = ref<InstanceType<typeof PageContent>>()
function handleQueryClick(queryInfo: any){
  contentRef.value?.fetchPageListData(queryInfo)
}
function handleResetClick(){
  contentRef.value?.fetchPageListData()
}

/** 点击model content内父子通信的操作 */
const modelRef = ref<InstanceType<typeof PageModel>>()
function handleNewClick(){
  modelRef.value?.setModelVisable()
}
function handleEditClick(itemData: any){
  modelRef.value?.setModelVisable(false,itemData)
}

</script>

<style scoped>
.department {
}
</style>
