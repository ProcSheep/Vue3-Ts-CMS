<template>
  <div class="user-search">
    <div class="search">
      <!-- el-row的特性: 会根据span的和是否为24进行自动换行 -->
      <el-form :model="searchForm" ref="formRef" label-width="80px" size="large">
        <el-row :gutter="20">
          <el-col :span="8" v-for="item in searchConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <!-- 动态组件不好绑定属性(可以利用v-bind),这里类型不多,所以使用template判断 -->
              <template v-if="item.type === 'input'">
                <el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder"/>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker v-model="searchForm[item.prop]" type="daterange" range-separator="到"
                  start-placeholder="开始时间" end-placeholder="结束时间" />
              </template>
              <template v-if="item.type === 'select'">
                <el-select v-model="searchForm[item.prop]" :placeholder="item.placeholder">
                  <el-option v-for="option in item.options" :label="option.label" :value="option.value"/>
                </el-select>
              </template>
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

interface Iprops {
  searchConfig: {
    formItems: any[]
  }
}

// 父子通信
const props = defineProps<Iprops>()
const emit = defineEmits(["queryClick", "resetClick"])

// 遍历配置,初始化表单
const initalFrom: any = {}
for(const item of props.searchConfig.formItems){
  initalFrom[item.prop] = ""
}
const searchForm = reactive(initalFrom)

const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
  // 组件el-form的event exposes提供的这个方法可以清空form表单
  // 需要el-form-item的prop属性指定输入框和数据searchForm的关系,用来确定清除哪一个form-item的值
  formRef.value?.resetFields()

  // 将事件传递出去,content内部重新发送网络请求
  emit('resetClick')
}

function handleQueryClick() {
  console.log('查询数据', searchForm)
  // 子传父: 发送事件+传参
  emit('queryClick', searchForm)
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