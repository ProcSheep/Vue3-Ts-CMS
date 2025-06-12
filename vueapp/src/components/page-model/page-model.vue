<template>
  <div class="user-model">
    <el-dialog v-model="dialogVisable" :title="isNewRef ? modelConfig.header.newTitle : modelConfig.header.editTitle"
      width="30%" center>
      <div class="form">
        <el-form :model="formData" label-width="80px">
          <template v-for="item in modelConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="formData[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker v-model="formData[item.prop]" type="daterange" range-separator="到"
                  start-placeholder="开始时间" end-placeholder="结束时间" />
              </template>
              <template v-if="item.type === 'select'">
                <el-select v-model="formData[item.prop]" :placeholder="item.placeholder">
                  <el-option v-for="option in item.options" :label="option.label" :value="option.value" />
                </el-select>
              </template>
              <!-- 插槽: role页面使用过 -->
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>

        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisable = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmBtn">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
// import { useMainStore } from '@/store/main/main';
// import { storeToRefs } from 'pinia';
import { useSystemStore } from '@/store/main/system/system';
import { reactive, ref } from 'vue';

interface IProps {
  modelConfig: {
    pageName: string,
    header: {
      newTitle: string,
      editTitle: string,
    },
    formItems: any[],
  },
  otherInfo?: any
}

// 定义props
const props = defineProps<IProps>()

// 1.定义数据
const dialogVisable = ref(false) // 是否显示dialog
const isNewRef = ref(true) // // 是否为创建新用户的操作
const editData = ref() // 记录被编辑用户的id数据
// 动态表单数据
const initalData: any = {}
for (const item of props.modelConfig.formItems) {
  initalData[item.prop] = ""
}
const formData = reactive<any>(initalData)

// 2.更改可见性的方法,可能会传入回显的个人数据
function setModelVisable(isNew: boolean = true, itemData?: any) {
  dialogVisable.value = true // 显示dialog
  isNewRef.value = isNew
  if (!isNew && itemData) { // 编辑数据,所有数据回显
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData // 记录编辑用户的数据
  } else { // 新建数据,所有数据赋空值
    for (const key in formData) {
      formData[key] = ""
    }
    editData.value = null // 新建用户则没有要编辑的数据,赋值null
  }
}

// 暴漏方法: 直接暴漏属性dialogVisable不可控,别人未必按照你的要求去修改,而暴漏方法可以确定如何去操作属性
defineExpose({ setModelVisable })

/** 不再需要,统一在department内部修改modelConfig配置项即可 */
// 3.获取role/department数据
// const mainStore = useMainStore()
// 保持响应式,数据已经在登录的时候请求了(login.ts) 
// const { entireDepartments } = storeToRefs(mainStore)

// 4.提交表单
const systemStore = useSystemStore()
function handleConfirmBtn() {
  let infoData = formData  // 最终要提交的表单,先把表单数据赋值
  if(props.otherInfo){
    infoData = { ...infoData, ...props.otherInfo } 
  }
  dialogVisable.value = false // 隐藏dialog
  if (!isNewRef.value && editData.value) {  // 编辑数据
    systemStore.editPageDataAction(props.modelConfig.pageName, editData.value.id, infoData)
  } else {  // 创建数据
    systemStore.newPageDataAction(props.modelConfig.pageName, infoData)
  }
}

</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>