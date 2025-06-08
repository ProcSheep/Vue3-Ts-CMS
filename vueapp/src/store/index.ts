import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import type { App } from 'vue';
import { useLoginStore } from './login/login';

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);

function registerStore(app: App<Element>){
  app.use(pinia)
  // 注册完pinia才可以用store
  const loginStore = useLoginStore()
  loginStore.loadStoreAction()
}

export default registerStore
