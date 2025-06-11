<template>
  <div class="user-model">
    <el-dialog v-model="dialogVisable" :title="isNewRef? '新建用户': '编辑用户'" width="30%" center>
      <div class="form">
        <el-form :model="formData" label-width="80px">
          <el-form-item label="用户名" prop="name">
            <el-input placeholder="请输入用户名" v-model="formData.name" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input placeholder="请输入真实姓名" v-model="formData.realname" />
          </el-form-item>
          <el-form-item v-if="isNewRef" label="密码" prop="password">
            <el-input placeholder="请输入密码" show-password v-model="formData.password" />
          </el-form-item>
          <el-form-item label="电话号码" prop="cellphone">
            <el-input placeholder="请输入电话号码" v-model="formData.cellphone" />
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select v-model="formData.roleId" placeholder="请选择角色" style="width: 100%">
              <el-option v-for="item in entireRoles" :key="item.id" :value="item.id" :label="item.name" />
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="deparmentId">
            <el-select v-model="formData.departmentId" placeholder="请选择部门" style="width: 100%">
              <el-option v-for="item in entireDepartments" :key="item.id" :value="item.id" :label="item.name" />
            </el-select>
          </el-form-item>
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
import { useMainStore } from '@/store/main/main';
import { useSystemStore } from '@/store/main/system/system';
import { storeToRefs } from 'pinia';
import { reactive, ref } from 'vue';

// 1.定义数据
const dialogVisable = ref(false) // 是否显示dialog
const isNewRef = ref(true) // // 是否为创建新用户的操作
const editData = ref() // 记录被编辑用户的id数据
const formData = reactive<any>({
  name: "",
  realname: "",
  password: "",
  cellphone: "",
  roleId: "", // 选择角色是Id,根据Id从角色表中选角色
  departmentId: ""
})

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

// 3.获取role/department数据
const mainStore = useMainStore()
// 保持响应式,数据已经在登录的时候请求了(login.ts) 
const { entireRoles, entireDepartments } = storeToRefs(mainStore)

// 4.提交表单
const systemStore = useSystemStore()
function handleConfirmBtn() {
  dialogVisable.value = false // 隐藏dialog
  if (!isNewRef.value && editData.value) {  // 编辑数据
    systemStore.editUserDataAction(editData.value.id, formData)
  } else {  // 创建新的用户
    systemStore.newUserDataAction(formData)
  }
}

</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>