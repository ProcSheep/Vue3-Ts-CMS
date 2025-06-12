<template>
  <div class="department">
    <PageSearch @query-click="handleQueryClick" @reset-click="handleResetClick" :search-config="searchConfig" />
    <PageContent ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick"
      :content-config="contentConfig">
      <!-- 完全自定义的定制化: 插槽 -->
      <template #leader="scope">
        <div class="leaderText">[{{ scope.row[scope.prop] }}]</div>
      </template>
      <template #parentId="scope">
        <div class="parentText">--{{ scope.row[scope.prop] ?? '/' }}--</div>
      </template>
    </PageContent>
    <PageModel :model-config="modelConfigRef" ref="modelRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import { computed } from 'vue';
import { useMainStore } from '@/store/main/main';
// 统一使用components内的通用组件,替换掉之前的cpns内的单一固定组件
import PageSearch from '@/components/page-search/page-search.vue';
import PageContent from '@/components/page-content/page-content.vue';
import PageModel from '@/components/page-model/page-model.vue';
// 配置文件config
import searchConfig from './config/search.config';
import contentConfig from './config/content.config';
import modelConfig from './config/model.config';
// hooks
import usePageContent from '@/hooks/usePageContent';
import usePageModel from '@/hooks/usePageModel';

// 1.配置modelConfig,新增异步数据
// 通过计算属性,内部依赖项(响应式数据)发生改变时,会重新计算返回新的数据
const modelConfigRef = computed(() => {
  const mainStore = useMainStore()
  // store中的entireDepartments数据是在login.ts中,也就是登录的时候就已经请求过了
  // 格式化一个符合要求的部门数组departments
  const departments = mainStore.entireDepartments.map(item => {
    return { label: item.name, value: item.id }
  })
  modelConfig.formItems.forEach((item) => {
    if (item.prop === "parentId") {
      item.options?.push(...departments)
    }
  })
  return modelConfig
})


// setup内相同逻辑的抽取 -> hooks
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modelRef, handleNewClick, handleEditClick } = usePageModel()

</script>

<style scoped>
.department {
  .leaderText {
    color: blue;
  }

  .parentText {
    color: red;
  }
}
</style>
