import 'normalize.css'
import '@/assets/css/index.css'
// 处理全局引入css样式,在使用自动导入后,针对feedback组件的css样式引入
// import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import icons from './global/register-incons'



const app = createApp(App)
app.use(icons) // app.use()引入插件函数会自动隐式传入第一个参数,实例对象app,无需我们自己传入
app.use(store) // pinia注册,封装点东西
app.use(router) // 先注册store再注册路由顺序更好,因为store中有重置动态路由的函数
app.mount('#app')
