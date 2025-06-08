<template>
  <div class="header-info">
    <!-- 图标 -->
    <div class="operation">
      <span>
        <el-icon>
          <Message />
        </el-icon>
      </span>
      <span>
        <i class="dot"></i>
        <el-icon>
          <ChatDotRound />
        </el-icon>
      </span>
      <span>
        <el-icon>
          <Search />
        </el-icon>
      </span>
    </div>
    <!-- 个人信息,组件dropdown下拉菜单 -->
    <div class="info">
      <el-dropdown>
        <div class="user-info">
          <!-- 头像框 -->
          <el-avatar :size="30" src="/FOX Alisa.jpg" />
          <span class="name">coderwhy</span>
        </div>
        <!-- 下拉框 -->
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-icon><InfoFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Lock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click="handleExitClick">
              <el-icon><CircleClose /></el-icon>
              <span >退出系统</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants';
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router';

const router = useRouter()
function handleExitClick() {
  // 1.删除token
  localCache.removeCache(LOGIN_TOKEN)
  // 2.删除掉上次注册的路由
  router.removeRoute('main')
  // 3.跳回/login
  router.push('/login')
}

</script>

<style lang="less" scoped>
.header-info {
  display: flex;
  align-items: center;
}

.operation {
  display: inline-flex;
  margin-right: 20px;

  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;

    &:hover {
      background: #f2f2f2;
    }

    i {
      font-size: 20px;
    }

    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background: red;
      border-radius: 100%;
    }
  }
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;

  .name {
    margin-left: 8px;
  }
}

/* 修改下拉列表的高度,不用:deep的原因是因为这个html元素在div-app之外,:deep是找不到app之外的元素的 */
// 改为全局加载:global,给整个html设置
.info {
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}
</style>