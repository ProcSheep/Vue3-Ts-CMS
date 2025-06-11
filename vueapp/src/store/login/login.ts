import { accountLoginRequest, getUserInfoById, getUserMenuByRoleId } from "@/service/login/login"
import { defineStore } from "pinia"
import type { IAccount } from "@/views/login/types"
import { localCache } from "@/utils/cache"
import router from "@/router"
import { LOGIN_TOKEN } from "@/global/constants"
import { mapMenusToRoutes } from "@/utils/map-menus"
import { useMainStore } from "../main/main"


const LOGIN = 'login'
const mainRoute = {
  path: '/main',
  name: 'main',
  component: () => import('@/views/main/main.vue')
};

interface ILoginState {
  token: string,
  // 服务器返回数据很多,省事可以写any,也可以去网站把JSON->Typescript
  userInfo: any,
  userMenu: any
}

export const useLoginStore = defineStore(LOGIN, {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache(LOGIN)?.userInfo ?? {},
    userMenu: localCache.getCache(LOGIN)?.userMenu ?? []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token

      // 本地local存储token(最高优先,后面网络请求鉴权token的依据)
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 1.获取用户的身份详细信息(role角色)
      const userInfoResult = await getUserInfoById(id)
      this.userInfo = userInfoResult.data
      // 2.根据角色权限获取不同的菜单
      const userMenuResult = await getUserMenuByRoleId(this.userInfo.role.id)
      this.userMenu = userMenuResult.data

      /** 插入补充: 4.请求所有的角色和部门数据,在登录成功后,动态路由添加前,先请求相关数据,后面大概率会用,先行请求节约时间 */
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      // 3.重点: 动态添加路由
      router.addRoute(mainRoute) // 顶层重新定义了main路由
      const routes = mapMenusToRoutes(this.userMenu)
      routes.forEach((route) => router.addRoute('main', route))

      // 跳转Main页面
      router.push("/main")
    },

    // 刷新页面后,重新映射和注册路由的函数
    loadStoreAction() {
      // 用户刷新不一定要在main页面中,在login页面中刷新也会执行,但是如果有下面的条件,则一定是登录后,在main页面内刷新的
      if (this.token && this.userInfo && this.userMenu) {
        // 重新执行一次映射和注册路由
        const routes = mapMenusToRoutes(this.userMenu)
        routes.forEach((route) => router.addRoute('main', route))

        // 同理,刷新后重新请求一次角色和部门数据,因为数据可能发生变化(增删改查...),所以需要重新请求
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()
      }
    }
  },
  persist: true // 开启持久化,会在本地存储 "login": loginResult
})



