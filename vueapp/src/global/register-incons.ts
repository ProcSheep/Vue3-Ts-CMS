import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type {App} from 'vue'

// 接受传递的app实例,同时定义其类型
function registerIcons(app:App<Element>){
  // icon图标全局注册
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}

export default registerIcons