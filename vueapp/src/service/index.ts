import { localCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config'
import HYRequest from './request'
import { LOGIN_TOKEN } from '@/global/constants'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    // 添加请求拦截器: 添加token鉴权
    requestSuccessFn(config) {
      const token = localCache.getCache(LOGIN_TOKEN)
      // config.headers是可选属性,确保都有这些值
      if(config.headers && token){ 
        config.headers.Authorization = "Bearer " + token
      }
      return config
    }
  }
})

export {
  hyRequest
}
