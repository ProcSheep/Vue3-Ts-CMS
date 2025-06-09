<template>
  <div class="user-search">
    <div class="search">
      <!-- el-row的特性: 会根据span的和是否为24进行自动换行 -->
      <el-form :model="searchForm" ref="formRef" label-width="80px" size="large">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="用户名" prop="name">
              <el-input v-model="searchForm.name" placeholder="请输入用户名" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="真实姓名:" prop="realname">
              <el-input v-model="searchForm.realname" placeholder="请输入真实姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电话:" prop="cellphone">
              <el-input v-model="searchForm.cellphone" placeholder="请输入电话" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态" prop="enable">
              <el-select v-model="searchForm.enable" placeholder="请选择状态" >
                <el-option label="启用" :value="1" />
                <el-option label="禁用" :value="0" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建时间:" prop="createAt">
              <el-date-picker v-model="searchForm.createAt" type="daterange" range-separator="到" start-placeholder="开始时间" end-placeholder="结束时间" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 重置和搜索按钮 -->
      <div class="btns">
        <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
        <el-button icon="Search" type="primary" @click="handleQueryClick()">查询</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus';
import { reactive, ref } from 'vue';

const searchForm = reactive({
  name: "",
  realname: "",
  cellphone: "",
  enable: 1,
  createAt: [], // el-data-picker组件保存数据结构为数组[开始时间,结束时间]
})

const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick(){
  // 组件el-form的event exposes提供的这个方法可以清空form表单
  // 需要el-form-item的prop属性指定输入框和数据searchForm的关系,用来确定清除哪一个form-item的值
  formRef.value?.resetFields()
}

function handleQueryClick(){
  console.log('查询数据')
}

</script>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;

  .el-form-item--large {
    padding: 8px 20px;
  }

  .btns {
    text-align: right;
    padding: 0 50px 10px 0;
  }
}
</style>