<template>
  <div class="user-content">
    <!-- 顶部搜索栏 -->
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? '数据标题' }}</h3>
      <el-button type="primary" @click="handleNewUserClick">{{ contentConfig?.header?.btnTitle ?? '新建数据' }}</el-button>
    </div>

    <!-- 用户列表 -->
    <div class="table">
      <!-- el-table升级为可展开行的table: 关键属性row-key (唯一id), 选择v-bind绑定,如果没有这个属性就不绑定 -->
      <el-table :data="pageList" border style="width: 100%" v-bind="contentConfig.childrenTree">
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <!-- 回忆: 属性绑定v-bind = { name: "why", age: 18 } ==> :name="why" :age=18 -->
            <!-- 特殊列: 插槽+调用函数, v-bind会额外绑定一个无用的type属性 :type:"timer" -->
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button text size="small" :icon="Edit" type="primary"
                  @click="handleEditBtnClick(scope.row)">编辑</el-button>
                <el-button text size="small" :icon="Delete" type="danger"
                  @click="handleDeleteBtnClick(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <!-- 特殊定制列: 具名作用域插槽 -->
            <el-table-column align="center" v-bind="item">
              <!-- 定义传递的属性为scope -->
              <template #default="scope">
                <!-- 所有的属性都会被传入scope内部,下面一个是直接给scope赋值scope,另一个是给scope.prop赋值item.prop -->
                <slot :name="item.slotName" v-bind="scope" :prop="item.prop"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <!-- 普通列: 无插槽,不调用函数,数据写死 -->
            <el-table-column align="center" v-bind="item" />
          </template>
        </template>
      </el-table>
    </div>

    <!-- 分页器 -->
    <div class="pagination" v-if="contentConfig.hasPagination">
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

// 父传子
interface IProps {
  contentConfig: {
    pageName: string,
    header?: {
      title?: string,
      btnTitle?: string
    },
    propsList: any[],
    childrenTree?: any,
    hasPagination?: boolean
  }
}

const props = defineProps<IProps>()

// 给 hasPagination 默认值 true, 只有menu页面没有
if (props.contentConfig.hasPagination === undefined) {
  props.contentConfig.hasPagination = true
}

/** 定义变量 */
const currentPage = ref(1) // 当前页
const pageSize = ref(10) // 每一页多少条数据

const emit = defineEmits(['newClick', 'editClick'])

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
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}

// 暴漏网络请求方法给父元素
defineExpose({ fetchPageListData })


// 5.删除页面数据
function handleDeleteBtnClick(id: number) {
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id) // 删除数据后会重新请求一次列表数据,会回到第一页
  currentPage.value = 1 // 页码也要回到第一页
}

// 6.新建用户数据
function handleNewUserClick() {
  emit('newClick')
}

// 7.编辑用户数据,需要知道编辑的是谁,然后回显以供编辑
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
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