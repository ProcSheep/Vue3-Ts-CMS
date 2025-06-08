import 'normalize.css'
import '@/assets/css/index.css'
// 处理全局引入css样式,在使用自动导入后,针对feedback组件的css样式引入
// import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import pinia from '@/store'
import registerIcons from './global/register-incons'



const app = createApp(App)
app.use(registerIcons) // app.use()引入插件函数会自动隐式传入第一个参数,实例对象app,无需我们自己传入
app.use(pinia)
app.use(router)
app.mount('#app')
