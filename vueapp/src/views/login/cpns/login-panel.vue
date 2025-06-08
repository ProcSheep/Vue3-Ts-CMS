<template>
  <div class="login-panel">
    <h1 class="title">宏远后台管理系统</h1>
    <div class="tabs">
      <el-tabs v-model="activeName" stretch class="demo-tabs">
        <el-tab-pane name="account">
          <!-- vue插槽语法糖: tab-pane标题 -->
          <template #label>
            <div class="label">
              <el-icon>
                <UserFilled />
              </el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <!-- tab内容: 封装后引入组件 -->
          <PanelAccount ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon>
                <Iphone />
              </el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <PanelPhone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" size="large" @click="handleLoginBtnClick">立即登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import PanelAccount from './panel-account.vue';
import PanelPhone from './panel-phone.vue';
import { localCache } from '@/utils/cache';

/** 变量定义 */
const activeName = ref('account')
const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)
/** ref承接子组件panel-account,那么ref的类型应当子组件的类型(即子组件这个实例对象的类型),如何获取? 不能写any,否则和js无异
 * 类型体操: PanelAccount是实例对象,它不是一种类型; typeof PanelAccount是构造函数的类型; InstanceType是构造函数创建的实例对象的类型
 * vue原始写法 export default {} (回顾复习) 导出的东西看似是一个对象,但是应该当作一个类使用,所以每导出一个对象,实际上是导出了一个类创建的实例对象
 * 现在只不过是语法糖secript-setup,但是导出的内容本质还是一个对象,即一个实例对象
 */
const accountRef = ref<InstanceType<typeof PanelAccount>>()

/** 事件处理函数 */
const handleLoginBtnClick = () => {
  if (activeName.value === 'account') {
    // 获取子组件实例,初始值为undefined
    accountRef.value?.loginAction(isRemPwd.value)
  }
}

/** 监听事件处理函数 */
// 记住密码操作,监听并保存isRemRwd
watch(isRemPwd, (newValue) => {
  localCache.setCache('isRemPwd', newValue)
})


</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .tabs {
    padding: 10px;
    border: 1px solid #e4e7ed;
  }

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;

    // --el-button-size: 50px; // 测试: 两层权重(.login-panel+.login-btn)更高于组件一层权重(.el-button--large)
  }
}
</style>