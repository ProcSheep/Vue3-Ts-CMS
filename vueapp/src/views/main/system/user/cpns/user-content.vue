<template>
  <div class="user-content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary">新建用户</el-button>
    </div>
    <div class="table">
      <!-- 自动遍历data内的数据(数组) -> 列名字label + 此列的数据prop -->
      <!-- 关于border和align显示问题是因为vscode识别问题,语法没问题 -->
      <el-table :data="userList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="55" />
        <el-table-column align="center" type="index" label="序号" width="55" />

        <el-table-column align="center" prop="name" label="用户名" width="120" />
        <el-table-column align="center" prop="realname" label="真实姓名" width="120" />
        <el-table-column align="center" prop="cellphone" label="手机号码" width="150" />
        <el-table-column align="center" prop="enable" label="状态" width="55" />
        <el-table-column align="center" prop="createAt" label="创建时间" />
        <el-table-column align="center" prop="updateAt" label="更新时间" />

        <el-table-column align="center" label="操作" width="150">
          <!-- 插槽放入按钮 -->
          <template #default>
            <el-button text size="small" :icon="Edit" type="primary">编辑</el-button>
            <el-button text size="small" :icon="Delete" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">分页器</div>
  </div>
</template>

<script setup lang="ts">
import { useSystemStore } from '@/store/main/system/system';
import { Delete, Edit } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';

// 1.发起action,请求userList的数据
const systemStore = useSystemStore()
systemStore.postUserListAction() // 异步

// 2.userList数据是异步请求的,需要保持响应式数据(计算属性或storeToRefs)
const { userList } = storeToRefs(systemStore) // 转为ref类型数据

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

  .table{
    margin-top: 15px;

    // 组件根元素的样式无需:deep
    .el-button{ 
      margin-left: 0;
    }
  }
}
</style>