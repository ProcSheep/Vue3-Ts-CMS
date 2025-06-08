import { accountLoginRequest, getUserInfoById, getUserMenuByRoleId } from "@/service/login/login"
import { defineStore } from "pinia"
import type { IAccount } from "@/view/login/types"
import { localCache } from "@/utils/cache"
import router from "@/router"
import {LOGIN_TOKEN} from "@/global/constants"

interface ILoginState {
  token: string,
  // 服务器返回数据很多,省事可以写any,也可以去网站把JSON->Typescript
  userInfo: any,
  userMenu: any
}

export const useLoginStore = defineStore('login',{
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: {},
    userMenu: []
  }),
  actions: {
    async loginAccountAction(account: IAccount){
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      const name = loginResult.data.name
      this.token = loginResult.data.token
      
      // 本地local存储token
      localCache.setCache(LOGIN_TOKEN, this.token) 

      // 1.获取用户的身份详细信息(role角色)
      const userInfoResult = await getUserInfoById(id)
      this.userInfo = userInfoResult.data
      // 2.根据角色权限获取不同的菜单
      const userMenuResult = await getUserMenuByRoleId(this.userInfo.role.id)
      this.userMenu = userMenuResult.data

      // 跳转Main页面
      router.push("/main")
    }
  },
  persist: true // 开启持久化,会在本地存储 "login": loginResult
})



