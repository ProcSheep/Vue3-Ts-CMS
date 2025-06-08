<template>
  <div class="panel-account">
    <el-form label-width="60px" :rules="rules" ref="formRef" :model="account" style="max-width: 600px" status-icon>
      <el-form-item label="账号:" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormRules, ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'

import { useLoginStore } from '@/store/login/login';
import type { IAccount } from '../types';
import { localCache } from '@/utils/cache';

/** 定义变量/常量/状态 */
const NAME = 'name'
const PASSWORD = 'password'
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()


// 1.form表单数据
const account = reactive<IAccount>({
  name: localCache.getCache(NAME) ?? "",
  password: localCache.getCache(PASSWORD) ?? ""
})


// 2.定义校验规则
interface RuleForm {
  name: string,
  password: string
}

const rules = reactive<FormRules<RuleForm>>({
  name: [
    // 检验规则可以是正则pattern, 失去焦点后校验blur
    { required: true, message: '必须输入账号信息', trigger: "blur" },
    { pattern: /^[a-z0-9]{6,20}$/, message: "账号由6-20位数字或字母组成", trigger: "blur" }
  ],
  password: [
    { required: true, message: '必须输入密码信息', trigger: "blur" },
    { pattern: /^[a-z0-9]{3,}$/, message: "密码由大于3位的数字或字母组成", trigger: "blur" }
  ]
})

// 3.登录逻辑
function loginAction(isRemPwd: boolean) {
  // 校验表单的逻辑
  formRef.value?.validate((valid, field) => {
    if (valid) {
      console.log('验证成功 把密码和账号发送给后端', account.name, account.password)
      const name = account.name
      const password = account.password
      // 登录操作: 派发store内的登录函数
      loginStore.loginAccountAction({name,password}).then(res => {
        // 登录成功且返回有数据后,执行记住密码操作(更严谨,如果登录失败,则记录密码行为无效)
        if(isRemPwd){
          localCache.setCache(NAME,name)
          localCache.setCache(PASSWORD,password)
        }else{
          localCache.removeCache(NAME)
          localCache.removeCache(PASSWORD)
        }
      })
    } else {
      console.log('验证失败', field)
      ElMessage({
        message: '警告: 登录信息错误!',
        type: 'warning',
        grouping: true
      })
    }
  })
}

// 4.暴漏方法给父组件
defineExpose({
  loginAction
})

</script>

<style lang="less" scoped></style>