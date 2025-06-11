<template>
  <div class="user-content">
    <!-- 顶部搜索栏 -->
    <div class="header">
      <h3 class="title">部门列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建部门</el-button>
    </div>

    <!-- 用户列表 -->
    <div class="table">
      <el-table :data="pageList" border style="width: 100%">
        <!-- 特殊列 -->
        <el-table-column align="center" type="selection" width="55" />
        <el-table-column align="center" type="index" label="序号" width="55" />

        <el-table-column align="center" prop="name" label="部门名" width="120" />
        <el-table-column align="center" prop="leader" label="部门领导" width="120" />
        <el-table-column align="center" prop="parentId" label="上级部门" width="120" />

        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="150">
          <!-- 插槽放入按钮,作用域传入操作用户的id -->
          <template #default="scope">
            <el-button text size="small" :icon="Edit" type="primary" @click="handleEditBtnClick(scope.row)">编辑</el-button>
            <el-button text size="small" :icon="Delete" type="danger" @click="handleDeleteBtnClick(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页器 -->
    <div class="pagination">
      <div class="demo-pagination-block">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper" :total="pageTotalCount" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSystemStore } from '@/store/main/system/system';
import { Delete, Edit } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';
import { formatUTC } from '@/utils/format.ts'
import { ref } from 'vue'

const currentPage = ref(1) // 当前页
const pageSize = ref(10) // 每一页多少条数据

const emit = defineEmits(['newClick','editClick'])

// 1.发起action,请求userList的数据
const systemStore = useSystemStore()
fetchPageListData() // 发送网络请求---异步

// 2.拿数据不再是userList... 而是以页面为主的pageList...
const { pageList, pageTotalCount } = storeToRefs(systemStore) // 转为ref类型数据

// 3.页码相关逻辑
function handleSizeChange() {
  fetchPageListData()
}
function handleCurrentChange() {
  fetchPageListData()
}

/** 4.定义函数用于发送网络请求
 * 参数: 
 *  @param formData: 用户查询表单的信息 
 */
function fetchPageListData(formData: any = {}) {
  // 1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size 

  const pageInfo = { size, offset }
  const queryInfo = { ...pageInfo, ...formData }
  // console.log(queryInfo)
  systemStore.postPageListAction('department',queryInfo)
}

// 暴漏网络请求方法给父元素
defineExpose({ fetchPageListData })


// 5.删除页面数据
function handleDeleteBtnClick(id: number){
  systemStore.deletePageByIdAction('department',id) // 删除数据后会重新请求一次列表数据,会回到第一页
  currentPage.value = 1 // 页码也要回到第一页
}

// 6.新建用户数据
function handleNewUserClick(){
  emit('newClick') 
}

// 7.编辑用户数据,需要知道编辑的是谁,然后回显以供编辑
function handleEditBtnClick(itemData:any){
  emit('editClick',itemData)
}   


</script>

<style lang="less" scoped>
.user-content {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 20px;
    }
  }

  .table {
    margin-top: 15px;

    // 组件根元素的样式无需:deep
    .el-button {
      margin-left: 0;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>