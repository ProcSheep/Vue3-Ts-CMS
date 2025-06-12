<template>
  <div class="role">
    <PageSearch :search-config="searchConfig" @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <PageContent ref="contentRef" :content-config="contentConfig" @new-click="handleNewClick"
      @edit-click="handleEditClick" />
    <PageModel ref="modelRef" :model-config="modelConfig" :other-info="otherInfo">
      <!-- 插槽: 角色的权限选择 -->
      <template #menuList>
        <!-- data: 树结构数据; node-key: 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的; -->
        <!-- props: label/指定节点的文本 children/根据属性寻找data中的子树节点  -->
        <el-tree style="max-width: 600px" :data="entireMenus" show-checkbox node-key="id"
          :props="{ children: 'children', label: 'name' }" @check="handleElTreeCheck"/>
      </template>
    </PageModel>
  </div>
</template>

<script setup lang="ts" name="role">
// 组件和配置文件
import PageSearch from '@/components/page-search/page-search.vue';
import PageContent from '@/components/page-content/page-content.vue';
import PageModel from '@/components/page-model/page-model.vue';
import searchConfig from './config/role.config';
import contentConfig from './config/content.config';
import modelConfig from './config/model.config';
// hooks
import usePageContent from '@/hooks/usePageContent';
import usePageModel from '@/hooks/usePageModel';
import { useMainStore } from '@/store/main/main';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

// 触发必要事件的函数
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modelRef, handleNewClick, handleEditClick } = usePageModel()

// 菜单数据(全部菜单,不是当前用户所能看到的菜单)
const mainStore = useMainStore()
const {entireMenus} = storeToRefs(mainStore)
const otherInfo = ref({}) // 记录menuList,一会父传子
// 参数1: 仅选中项整个的完整对象 参数2: 选中项和父项的数据
function handleElTreeCheck(data1: any, data2: any){
  // 记录选中项和父项的权限id
  console.log(data2.checkedKeys,data2.halfCheckedKeys)
  const menuList = [...data2.checkedKeys,...data2.halfCheckedKeys]
  otherInfo.value = { menuList } 
}

</script>

<style scoped>
.role {}
</style>
