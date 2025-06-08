import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { createRouter, createWebHashHistory } from 'vue-router'

// vue内置有类型,所以自己不用写
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/notFound/notFound.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/main',
      name: 'main', // 对addRouter有用
      component: () => import('@/views/main/main.vue')
    }
  ]
})


// 路由守卫: 路由跳转之前拦截,并做一些操作
// 参数 to->要去的路由 from->从那个路由过来
// 返回值 最终决定要跳转的路由,当不写值或undefined时就默认跳转
router.beforeEach((to,from) => {
  const token = localCache.getCache(LOGIN_TOKEN)

  // 没有token,先登录
  if(to.path.startsWith('/main') && !token){ 
    return '/login' 
  }

  // 如果进入main,则进入所拥有的第一个菜单
  if(to.path === '/main' && token) return firstMenu?.url 
  
})


export default router
