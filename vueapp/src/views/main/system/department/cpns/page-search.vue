<template>
  <div class="user-search">
    <div class="search">
      <!-- el-row的特性: 会根据span的和是否为24进行自动换行 -->
      <el-form :model="searchForm" ref="formRef" label-width="80px" size="large">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="部门名称" prop="name">
              <el-input v-model="searchForm.name" placeholder="请输入部门名称" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="部门领导:" prop="leader">
              <el-input v-model="searchForm.leader" placeholder="请输入查询的部门领导" />
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

// 子传父
const emit = defineEmits(["queryClick","resetClick"])

const searchForm = reactive({
  name: "",
  leader: '',
  createAt: ''
})

const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick(){
  // 组件el-form的event exposes提供的这个方法可以清空form表单
  // 需要el-form-item的prop属性指定输入框和数据searchForm的关系,用来确定清除哪一个form-item的值
  formRef.value?.resetFields()

  // 将事件传递出去,content内部重新发送网络请求
  emit('resetClick')
}

function handleQueryClick(){
  console.log('查询数据',searchForm)
  // 子传父: 发送事件+传参
  emit('queryClick',searchForm)
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