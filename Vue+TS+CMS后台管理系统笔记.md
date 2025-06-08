# vue3/ts 后台管理系统

## 准备工作 (全体待重构)

### 项目初始化

- 1.构建项目,vite: `npm create vite@latest` ==选择 TS+Vue==
- 1.1vue 的插件: `vue-official`和`vue vscode snippets`
- ==2.配置 eslint==: `npm init @eslint/config@latest`
- ==2.1 初始化 eslint==: `npx eslint --init`
- ==3.vite.config.ts 配置@路径==
- webpack 打包时会合并这个文件内的配置,vite 的配置都写在这里,配置项目构建和开发环境
- ==3.1 安装 types/node==: `npm install @types/node --save-dev`

  ```ts
  import { defineConfig } from "vite";
  import vue from "@vitejs/plugin-vue";
  import path from "path"; // @types/node

  // https://vite.dev/config/
  export default defineConfig({
    plugins: [vue()], // vue插件,识别vue
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"), // 路径配置
      },
    },
  });
  ```

  > path 是 Node.js 的内置模块，TypeScript 要借助类型声明文件才能识别该模块。你可以通过安装 @types/node 来获取相关的类型声明。
  > ==注意: 这个配置是打包时告诉 vite 我们的路径配置,打包的时候识别`@`的路径是哪里,而不是在 vscode 开发阶段,在`tsconfig.app.json`中配置==

- ==4.tsconfig.json==
- ts 配置入口文件,可以在这里配置,但是推荐在对应的文件里配置,这样文件分工明确,更加清晰,vue 把文件拆分为两个,如下
  ```json
  {
    "files": [],
    "references": [
      { "path": "./tsconfig.app.json" },
      { "path": "./tsconfig.node.json" }
    ]
  }
  ```
- ==4.1 tsconfig.app.json== 主要用于定义 TypeScript 编译器在处理项目应用代码时所采用的编译选项。

  ```json
  {
    /* 在node_modules中,一些额外的依赖配置文件 */
    "extends": "@vue/tsconfig/tsconfig.dom.json",
    "compilerOptions": {
      /* 指定 TypeScript 增量编译时用于存储构建信息的文件路径 */
      "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
      /* vscode开发阶段用于识别路径 */
      "paths": {
        "@/*": ["./src/*"]
      },

      /* Linting */
      "strict": true /* 严格类型检查 */,
      "noUnusedLocals": true /* 若存在未使用的局部变量，编译器会发出错误 */,
      "noUnusedParameters": true /* 若存在未使用的函数参数，编译器会发出错误 */,
      "noFallthroughCasesInSwitch": true /* 禁止 switch 语句中出现没有 break 或 return 的穿透情况 */,
      "noUncheckedSideEffectImports": true /* 当导入的模块存在副作用（例如修改全局变量），但没有明确的类型声明时，编译器会发出错误 */
    },
    /* 指定需要 TypeScript 编译器处理的文件路径模式。在这个例子中，它包含了 src 目录下所有的 .ts、.tsx 和 .vue 文件。 */
    "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"]
  }
  ```

  > ==需要在这里配置`@`的路径识别,这样在 vscode 写代码时才会有提示和识别==

- ==4.2 tsconfig.node.json== 主要作用是为在 Node.js 环境中运行的 TypeScript 代码（如配置文件、脚本等）指定编译选项

  ```json
  {
    "compilerOptions": {
      "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
      "target": "ES2022",
      "lib": ["ES2023"],
      "module": "ESNext",
      "skipLibCheck": true,

      /* Bundler mode */
      "moduleResolution": "bundler",
      "allowImportingTsExtensions": true /* 允许在 import 语句中使用 .ts 扩展名 */,
      "isolatedModules": true /* 确保每个文件都作为单独的模块进行编译，即每个文件都可以独立编译，而不依赖于其他文件的上下文。 */,
      "moduleDetection": "force" /* 强制将所有文件视为模块。即使文件中没有显式的 import 或 export 语句，也会将其视为模块。 */,
      "noEmit": true /* 不生成编译后的 JavaScript 文件。这通常用于仅进行类型检查的场景，例如在开发过程中，只需要检查代码的类型正确性，而不需要实际生成编译后的文件。 */,

      /* Linting */
      "strict": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "noFallthroughCasesInSwitch": true,
      "noUncheckedSideEffectImports": true
    },
    /* 需要 TypeScript 编译器处理的文件路径。这里只包含了 vite.config.ts 文件，表示该配置文件主要用于处理 Vite 配置文件的编译 */
    "include": ["vite.config.ts"]
  }
  ```

- 5.==/src/vite-env.d.ts (.d.ts 声明文件)==
  ```html
  /// <reference types="vite/client" />
  ```

### 项目规范(lint/pre)

- ==详见项目搭建和接口文档.md==
- 1.已配置`.editorconfig`(现在不用了,这时早先版本的,现在使用 pre 代替,它们功能差不多,都是规范代码格式的)
- 2.已下载 prettier 插件,创建下面的文件并配置
  `.prettierrc`
  `.prettierignore`
  同时在设置中配置一些东西
- 3.下载 eslint 插件(已完成),负责检测一些不符合规范的格式,并报错提醒
  [![pETlVk8.png](https://s21.ax1x.com/2025/04/27/pETlVk8.png)](https://imgse.com/i/pETlVk8)

  - 配置 eslint 与 prettier 冲突
  - 新的 eslint9+配置与以往不同,可以看文档学习如何配置
  - 引入插件 plugin,在 extends 中继承配置,这样就不用在 rules 中自己从 0 开始写了
  - 所有的配置都是默认 eslint 本体的,有 js ts 和 vue , 配置在对应的区域
  - 最后在默认加上处理 pre 与 esl 矛盾的 2 个插件即可

  ```js
  import js from "@eslint/js";
  import globals from "globals";
  import tseslint from "typescript-eslint";
  import pluginVue from "eslint-plugin-vue";
  import { defineConfig } from "eslint/config";
  import eslintConfigPrettier from "eslint-config-prettier";
  import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
  import { off } from "process";

  export default defineConfig([
    {
      files: ["**/*.{js,mjs,cjs,ts,vue}"],
      plugins: {
        js, // js 插件
      },
      extends: [
        "js/recommended", // eslint 中推荐的 js 规则,来自 js 插件
        ...tseslint.configs.recommended, // ts 推荐规则
        eslintConfigPrettier, // prettier 规则优先于 eslint
        eslintPluginPrettierRecommended, // 将 pre 规则集成到 esl 中,并且 pre 的格式化问题会报告为 esl 警告
      ],
      rules: {
        // 大多数规则自己别写了,用 eslint 自带的
        "vue/multi-word-component-names": off, // 对特别的不合适的规则,根据提示自己取消掉
      },
    },
    {
      files: ["**/*.{js,mjs,cjs,ts,vue}"],
      languageOptions: { globals: globals.browser },
    },
    tseslint.configs.recommended, // TypeScript 推荐规则
    {
      files: ["**/*.vue"],
      plugins: {
        vue: pluginVue, // vue 插件
      },
      extends: [
        ...pluginVue.configs["flat/essential"], // vue 推荐规则,看文档
        // 'vue/flat/essential'
        // 'vue/vue3-essential'
      ],
      languageOptions: {
        parserOptions: { parser: tseslint.parser },
        ecmaVersion: 2020,
      },
    },
    {
      ignores: [
        "node_modules",
        "dist",
        "build",
        ".git",
        ".vscode",
        ".idea",
        "*.min.js",
        "*.map",
        "*.svg",
        "*.png",
        "*.jpg",
        "*.woff",
        "*.ttf",
        "*.md",
        "package-lock.json",
        "yarn.lock",
        ".env",
      ],
    },
  ]);
  ```

### css 重置

- 下载 less: `npm i less -D`
- normalize.css 模块: `npm i normalize.css`
- 自己的重置 css 文件: reset.css + common.css + index.css
- 引入 main.ts 文件

### vue 全家桶

- 路由: `npm i vue-router`,hash 模式,搭建页面路由,引入 main.ts
- 公共状态管理: `npm i pinia`,创建 store index.ts,引入 main.ts
- 配置主路由 (view/)login/main.vue 和 notFound 页面
- snippet 配置代码片段 `tsvueSetup`

### axios 使用

- 使用之前封装的 axios,是 ts 类型体操封装的 axios 文件
- 下载: `npm i axios`,测试一下即可

### 区分开发和生产环境(-<)
- 开发环境 development/生产环境 production 下同一个值很可能不同
- 比如 baseURL 服务器地址可能不同,开发中需要对服务器各种测试,需要有专门的测试服务器; 而线上产品的服务器是稳定的,提供给用户更好的体验;
- ==开发时,需要对开发环境和生产环境进行区分==
- ==vite提供的import.meta.env对象上的特殊环境变量==
  - vite提供的默认环境变量之一: import.meta.env.MODE
  - MODE: 返回当前的模式development/production, 测试prod可以打包后运行 `npm run preview` 进行预览,产看环境
  - 或者 布尔类型 import.meta.env.DEV/PROD 也可以判断
    ```js
      if(import.meta.env.MODE === 'production'){
        BASE_URL = 'AAA'
      }else {
        BASE_URL = 'BBB'
      }
    ```
- ==2.vite支持自定义全局变量==
  - 在.env文件中,以VITE开头设置变量,例如`VITE_NAME = 'coderwhy'`,这样变量就可以通过`import.meta.env`获取了
  - 另外,可以在对应环境设置对应变量,这样在对应环境下才能获取对应变量,格式为`.env.[mode]`: ==.env.development / .env.production== 
  - 额外的, ==.env.local / .env.[mode].local==: 不加local可以提交git仓库,加local后此文件不可提交git仓库,可以保存隐私变量(管理员密码等)

### 集成ElementPlus()
- 专门用于做后台管理系统的组件库,内部组件很适合做模板形式的网页
- 下载: `npm install element-plus --save`,
  - ==全局引入==: 在main.ts全局注册和引入css即可,如果只用几个组件,就没必要全局注册,会造成较大的打包体积; 
  - 另外有按需导入和手动导入2个方法,看文档即可
    - ==**自动导入可以不必手动一个个导入组件,会自动引入,解放双手,推荐使用! 具体看文档**==
    - ==额外的,在tsconfig.app.json内部`includes`,把生成的文件components.d.ts和auto-imports.d.ts放入,让ts识别组件的类型,js不需要这样做==
    > 注意: 对于反馈组件Feedback,它不是组件,而是js方法的调用,自动导入对于这种是没办法的,需要自己手动导入

### ele中的css(X)
- 文档到现在还没有更新css相关的文档,但是在使用组件时可以获取到组件的样式,形如`--primaryColor--`这种,然后和使用vant组件库一样改变组件内置的css即可

## 登录页login
### 基础搭建
- 应用组件: 从简单的地方开始搭建,表单组件的checkbox选择框 link超链接 button按钮组件, 非常简单,可以看login-panel.vue的代码
  [![pVPa5X6.png](https://s21.ax1x.com/2025/06/04/pVPa5X6.png)](https://imgse.com/i/pVPa5X6)
### 研究ele的样式
- ==研究elementPlus的css样式,然后进行css样式覆盖==,由于文档未完善,不像vant库文档那样提供了可以覆盖的css变量,所以需要自己摸索,其实也是有的,只是文档还没写而已
- 下面是对登录的按钮组件css的研究,同理其他组件一样
  [![pVPJu7j.png](https://s21.ax1x.com/2025/06/04/pVPJu7j.png)](https://imgse.com/i/pVPJu7j)
- 测试如下,找到对应元素的class标签
    ```css
      .login-btn {
        margin-top: 10px;
        width: 100%;

        // --el-button-size: 50px; // 测试: 两层权重(.login-panel+.login-btn)更高于组件一层权重(.el-button--large)
      }
    ```

### Tabs选项卡+插槽图标
- 切换效果的tabs组件---导航组件类
- Tab-pane的标题处设置图标 -> 使用插槽
  - 下载图标: `npm install @element-plus/icons-vue`
  - 使用方法: 
    - ==全局导入(简单方法)==
      ```ts
        // main.ts
        import * as ElementPlusIconsVue from '@element-plus/icons-vue'
        const app = createApp(App)
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
          app.component(key, component)
        }
      ```
    - 浏览器导入,CDN,不可能用,太麻烦
    - 自动导入,风格不同,不建议初学用
  - ==封装插件==,理解插件的使用`app.use()`
    ```ts
      /**
       * src/global
       * 下面的代码来自官网, 只需要额外确定传入app实例的类型App<Element>
      */ 
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
    ```
    ```ts
      // main.ts
      const app = createApp(App)
      app.use(registerIcons) // app.use()引入插件函数会自动隐式传入第一个参数,实例对象app,无需我们自己传入
    ```
- ==使用插槽: 回忆插槽的语法糖==
  [![pVPJnBQ.png](https://s21.ax1x.com/2025/06/04/pVPJnBQ.png)](https://imgse.com/i/pVPJnBQ)
  ```html
    <el-tabs v-model="activeName" stretch class="demo-tabs" @tab-click="handleTabsClick">
        <el-tab-pane name="account">
          <!-- vue插槽语法糖: tab-pane标题 -->
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <!-- tab内容: 封装后引入组件 -->
          <PanelAccount ref="accountRef"/>
      </el-tab-pane>
    </el-tabs>
  ```
    > 插槽内容: 图标(el-icon) + 标题
    > 插槽后面的代码是tab实体内容
- ==识别'账号登录'或'手机登录',利用`el-tabs`的属性获取==
  - 理解el-tabs与el-tab-pane的联动: el-tabs的v-model属性可以获取el-tab-pane内name属性的值,当前所处tab的name会被双向绑定给activeName
    ```ts
      const activeName = ref('account')
      // 登录按钮的点击事件
      const handleLoginBtnClick = () => {
        if(activeName.value === 'account'){
          // 获取子组件实例,初始值为undefined
          accountRef.value?.loginAction()
        }else{
          // ....
        }
      }
    ```

### el-form表单+校验表单
- 输入账号登录/手机登录: ==表单组件Form + 封装成小组件== -> panel-account/phone.vue
- 表单组件: el-form/el-form-item,如下,简单的样式属性不介绍了
  ```html
    <el-form label-width="60px" :rules="rules" :model="account" style="max-width: 600px" status-icon>
      <el-form-item label="账号:" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="account.password" />
      </el-form-item>
    </el-form>
  ```
- ==获取表单的内容==
  - 表单el-form双向绑定:model用于获取表单的值,account如下
    ```ts
      // 1.form表单数据
      const account = reactive({
        name: "",
        password: ""
      })
    ```
  - 获取对应的el-input的输入值,通过`v-model=account.XXX`区分
- ==表单校验==
  - 表单校验的规则由el-form决定,属性为rules
  - 表单校验rules内的规则对应校验哪一个el-form-item,由其属性prop决定
- ==定义规则: 示例如下(最基础的)==
  ```ts
    // 2.定义校验规则
    interface RuleForm {
      name: string,
      password: string
    }

    const rules = reactive<FormRules<RuleForm>>({
      name: [
        // 检验规则可以是正则pattern, 失去焦点后校验blur
        { required: true, message: '必须输入账号信息', trigger: "blur" },
        { pattern: /^[a-z0-9]{6,20}$/, message: "账号由6-20位数字或字母组成", trigger: "blur" }
      ],
      password: [
        { required: true, message: '必须输入密码信息', trigger: "blur" },
        { pattern: /^[a-z0-9]{3,}$/, message: "密码由大于3位的数字或字母组成", trigger: "blur" }
      ]
    })
  ```
  > 校验规则ts新增泛型RuleForm,它的类型就是表单类型,保证了在制定规则时,不会出现表单类型之外的规则定义(无效化), 而且可以检测规则的合理性,比如不能对布尔类型的表单数据制定有关number类型的法则
- ==获取表单内容==
  - 点击登录时获取表单内容,==问题是现在表单和登录按钮不是一个组件,表单所在组件(panel-account)是登录按钮组件(login-panel)的子组件==
  - 1.首先暴漏子组件内部的方法
  - ==组合式api `setup()/script+setup` 语法糖,采用模块作用域封装,内部变量不会自动挂载到组件实例上,所以必须暴漏`Expose`出去,而选项式api `export default`自动暴露,可以通过ref获取其实例对象后直接获取内部的所有东西==
    ```ts
      // 3.登录逻辑
      function loginAction(){
        console.log('把密码和账号发送给后端',account.name , account.password)
      }
      // 4.暴漏方法给父组件
      defineExpose({
        loginAction
      })
    ```
  - 2.父组件获取子组件实例对象的方法后,调用方法,实现打印(后期可以向后端发送)
  - ==重点,初始化ref的实例的类型==
    ```ts
    /** accountRef承接子组件panel-account,那么ref的类型应当子组件panel-account的类型,如何获取? 不能写any,否则和js无异
    * 类型体操InstanceType: PanelAccount是实例对象,它不是一种类型; typeof PanelAccount是构造函数的类型,即创建组件实例的类或函数类型; InstanceType是构造函数创建的实例对象的类型
    * 更多解释:
    * vue原始写法 export default {} (回顾复习) 导出的东西看似是一个对象,但是应该当作一个类使用,所以每导出一个对象,实际上是导出了一个类创建的实例对象,现在只不过是语法糖secript-setup,但是导出的内容本质还是一个实例对象
    */
    const accountRef = ref<InstanceType<typeof PanelAccount>>()
    ```
    ```html
      <PanelAccount ref="accountRef"/>
    ```
    ```ts
      const handleLoginBtnClick = () => {
        if(activeName.value === 'account'){
          // 获取子组件实例,初始值为undefined,所以用?.
          accountRef.value?.loginAction()
        }
      }
    ```
- ==紧接着完善表单的校验==
  ```ts
    // 3.登录逻辑
    function loginAction() {
      // 校验表单的逻辑
      formRef.value?.validate((valid, field) => {
        if (valid) {
          console.log('验证成功 把密码和账号发送给后端', account.name, account.password)
          // 派发store内的异步函数
          const name = account.name
          const password = account.password
          loginStore.loginAccountAction({name,password})
        } else {
          console.log('验证失败', field)
          ElMessage({
            message: '警告: 登录信息错误!',
            type: 'warning',
            grouping: true
          })
        }
      })
    }
  ```
- ==获取表单的类型同理,表单el-form也是组件,和我们引入的自己的组件都是一样的==
  ```ts
    import type { FormRules, ElForm } from 'element-plus'
    const formRef = ref<InstanceType<typeof ElForm>>()
  ```
- 注意: Feedback类型组件引入不是自动的
  ```ts
    import { ElMessage } from 'element-plus'
  ```
- 同理需要配置css,可以单独引入,==也可以全部引入(推荐)==
  ```ts
    // 局部针对el-message的css样式进行导入
    import 'element-plus/theme-chalk/el-message.css'
  ```
  ```ts
    // 全局导入 
    import 'element-plus/dist/index.css'
  ```
### 登录请求(*)
- BASE_URL已更新: `http://codercba.com:5000` 
- ==思路: 和之前一样,由状态管理store负责发送请求和保存数据,不同的是pinia的状态管理比起redux要简单的多,而对应的网络请求函数封装到server/XXX文件内,比如login页面的网络请求,全部封装进server/login==
- post发送登录的请求
  ```ts
    // server/login
    import { hyRequest } from "..";
    import type { IAccount } from "@/view/login/types";

    export function accountLoginRequest(account: IAccount){
      return hyRequest.post({
        url: '/login',
        data: account
      })
    }
  ```
- pinia发送请求并保存数据
  ```ts
    // store/login
    import { accountLoginRequest } from "@/service/login/login"
    import { defineStore } from "pinia"
    import type { IAccount } from "@/view/login/types"

    export const useLoginStore = defineStore('login',{
      state: () => ({
        id: '',
        token:'',
        name:''
      }),
      actions: {
        async loginAccountAction(account: IAccount){
          const loginResult = await accountLoginRequest(account)
          this.id = loginResult.data.id
          this.token = loginResult.data.token
          this.name = loginResult.data.name
        }
      },
      persist: true // 开启持久化
    })
  ```
  > state状态管理; actions可以直接执行异步函数; 开启pinia持久化
- ==最后在view/login页面获取store实例==
- 派发内部的异步函数loginAccountAction的代码在上面表单校验部分
  ```ts
    import { useLoginStore } from '@/store/login/login';
    const loginStore = useLoginStore()
  ```
- pinia持久化: 记得在main.ts注册pinia
  ```ts
    import { createPinia } from 'pinia'
    import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate);

    export default pinia
  ```
  > npm i pinia-plugin-persistedstate
- 额外的类型定义: 我们把account变量的类型定义在view/login/types内部,以后其他的同理
  ```ts
    export interface IAccount{
      name: string,
      password: string
    }
  ```
  > 导入这种单纯类型定义,记得加type前缀,打包时可以删除这些冗余的定义 

### 封装本地存储工具
- 简单易懂
  - 1.封装时,两个存储local/session都封装了
  - 2.传入value数据记得全部统一转为JSON数据(stringify),使用时解析(parse)
    ```ts
      // utils
      enum CacheType{
        Local,
        Session
      }

      class Cache{
        storage: Storage
        constructor(type: CacheType){
          this.storage = type === CacheType.Local ? localStorage : sessionStorage
        }

        setCache(key: string, value:any){
          this.storage.setItem(key, JSON.stringify(value))
        }

        getCache(key: string){
          const value = this.storage.getItem(key)
          if(value){
            return JSON.parse(value)
          }
        }

        removeCache(key: string){
          this.storage.removeItem(key)
        }

        clear(){
          this.storage.clear()
        }
      }

      const localCache = new Cache(CacheType.Local)
      const sessionCache = new Cache(CacheType.Session)

      export {
        localCache,
        sessionCache
      }
    ```
### 存储登录密钥
- 使用本地存储函数,在登录成功后,把密钥存储在本地
  ```ts
    // 紧接着在store/login的网络请求后保存数据
    localCache.setCache(LOGIN_TOKEN, this.token) // 本地local存储token
  ```
- 对于常量的数据,如果使用的较多,建议定义,以防写错,并且如果多个文件都会使用,可以统一定义在`/global/constants.ts`
  ```ts
    export const LOGIN_TOKEN = 'login/token'
  ```
### 路由守卫v1(*)
- ==**规范登录: 不让用户可以在没有登录的情况下,通过路由跳转进入系统内页面**==
- 最基础的路由守卫版本v1:
  - 简单的逻辑导航: 默认`/`路径跳转`/main`,==添加路由守卫,如果跳`/main`页面,但是没有登录token,就返回`/login`登录==
  ```ts
    // router/index.ts
    // 路由守卫: 路由跳转之前拦截,并做一些操作
    // 参数 to->要去的路由 from->从那个路由过来
    // 返回值 最终决定要跳转的路由,当不写值或undefined时就默认跳转
    router.beforeEach((to,from) => {
      const token = localCache.getCache(LOGIN_TOKEN)

      // 没有token,先登录
      if(to.path ==='/main' && !token){ 
        return '/login' 
      }
      
    })
  ```
  > 这是重点之一,后面会完善(v.x)

### 退出登录
- 简单逻辑(main.vue)
  - 删除本地存储login_token
  - 跳回login
  ```ts
    function handleExitClick(){
      // 1.删除token
      localCache.removeCache(LOGIN_TOKEN)
      // 2.跳回/login
      router.push('/login')
    }
  ```
### 记住密码
- 记住密码的变量isRemPwd定义在login-panel内,登录信息在其子组件account-panel内,之前通过ref获取子组件实例,可以通过这个传入变量
- ==1.点击登录按钮,调用子组件函数的同时传入isRemPwd==
  ```ts
    // login-panel
    const handleLoginBtnClick = () => {
      if(activeName.value === 'account'){
        // 获取子组件实例,初始值为undefined
        accountRef.value?.loginAction(isRemPwd.value)
      }
    }
  ```
  > 记得调整loginAction函数的参数接受,类型为boolean
- ==2.获取isRemPwd变量,判断是否存储登录信息==
  ```ts
    // account-panel
    /** 定义变量/常量/状态 */
    const NAME = 'name'
    const PASSWORD = 'password'

    // 1.form表单数据,双向绑定
    const account = reactive<IAccount>({
      name: localCache.getCache(NAME) ?? "",
      password: localCache.getCache(PASSWORD) ?? ""
    })

    // loginAction函数内,登录操作: 派发store内的登录函数
    loginStore.loginAccountAction({name,password}).then(res => {
      // 登录成功且返回有数据后,执行"记住密码"操作(更严谨,如果登录失败,则记录密码行为无效)
      if(isRemPwd){
        localCache.setCache(NAME,name)
        localCache.setCache(PASSWORD,password)
      }else{
        localCache.removeCache(NAME)
        localCache.removeCache(PASSWORD)
      }
    })
  ```
- ==3."记住密码"行为持久化==
- 监听isRemPwd变化,保存在本地,然后动态修改isRemPwd初始化值
  ```ts
    // login-panel
    const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false) 

    /** 监听事件处理函数 */
    // 记住密码操作,监听并保存isRemRwd
    watch(isRemPwd, (newValue) => {
      localCache.setCache('isRemPwd',newValue)
    })
  ```
## **角色权限(重点)**
- ==RBAC(role based access control): 数据库知识,意为"基于角色的访问控制"==
- 一个公司有不同的职位,单纯以'人'为主体,分配权限是不行的,因为公司的人员会有变动,这样效率低,所以数据库设计的时候会以"角色"为主体,比如设计"超级管理员(总裁,总经理) 管理员(主管,组长) 普通用户(普通员工)",这样只需要设计三个角色,然后根据公司职位分配管理系统的"角色",公司的人员通过不同的'角色'进入后台管理系统可以获取不同的权限;
- ==初始提供的测试账号: `coderwhy coderdemo` 密码: `123456`==
- ==RBAC表在数据库中的构建: 用户表--(多对一)--角色表--(多对多 + 关系表)--权限表, Node高级中有MySQL知识==
### 鉴权拦截
- ==接下来的很多网络请求都需要鉴权,通过我们之前登录获取`token`就可以实现鉴权,鉴权方式:`Bearer token`==
- 如: `headers.Authorization = 'Bearer '  + token` 
- ==**利用拦截器鉴权,之前封装的axios支持在实例对象上添加自定义拦截器,所以如下**==
  ```ts
    // service/index.ts
    const hyRequest = new HYRequest({
      baseURL: BASE_URL,
      timeout: TIME_OUT,
      interceptors: {
        // 添加请求拦截器: 添加token鉴权
        requestSuccessFn(config) {
          const token = localCache.getCache(LOGIN_TOKEN)
          // config.headers是可选属性,确保config.headers和token都有值
          if(config.headers && token){ 
            config.headers.Authorization = "Bearer " + token
          }
          return config
        }
      }
    })
  ```
### 指定state类型
- 在定义state时,ts会自动对state内部的类型进行类型推断,但是不准确,甚至还会有错误阻碍后面数据获取
  ```ts
    state: () => ({
      token: localCache.getCache(LOGIN_TOKEN) ?? '',
      userInfo: {},
      userMenu: []
    })
  ```
  > ==如上: token会被判定为any(实际为string); 而userInfo和userMenu会被判定为{}和[]类型(常量类型),这样子反而获取不到内部的数据,因为{}或[]类型的数据不能进一步`.`里面的数据了,形如`userInfo.role`会被ts识别为错误的用法==
- 第一个可以给state定义类型,可以通过泛型`definedStore<T,S,...>`传入类型,这个麻烦,==所以可以借助箭头函数直接定义返回值的类型,如下==
  ```ts
    interface ILoginState {
      token: string,
      // 服务器返回数据很多,省事可以写any,也可以去网站把JSON->Typescript
      userInfo: any,
      userMenu: any
    }

    state: (): ILoginState => ({
      token: localCache.getCache(LOGIN_TOKEN) ?? '',
      userInfo: {},
      userMenu: []
    }),
  ```
  > ==1.对于服务器返回的复杂类型数据,建议直接定义类型为`any`==
  > 2.这里修改下store内状态,删除了name和id,转为局部临时变量,因为这两个数据没有必要保存为状态,userInfo内部都有这两个数据

### 查询用户角色和菜单
- 根据接口文档,添加新的网络请求
  ```ts
    // service/login.ts
    export function getUserInfoById(id: number){
      return hyRequest.get({
        url: `/users/${id}`
      })
    }
    
    export function getUserMenuByRoleId(id: number){
      return hyRequest.get({
        url: `/role/${id}/menu`
      })
    }
  ```
- 依旧在store内,紧接着网络请求的下一步,根据用户id请求用户角色,然后根据角色id请求角色菜单,设计后端的接口在这里是有联系的,环环相扣
  ```ts
    // store/login
    // 1.获取用户的身份详细信息(role角色)
    const userInfoResult = await getUserInfoById(id)
    this.userInfo = userInfoResult.data
    // 2.根据角色权限获取不同的菜单
    const userMenuResult = await getUserMenuByRoleId(this.userInfo.role.id)
    this.userMenu = userMenuResult.data
  ```
  > ==最后注意: 因为返回的数据被放入state中,vue为了state数据响应式,所以会把数据套入`proxy`对象,不影响正常数据通过`.`获取==

## 主页Main
### 主页布局container
- 采用容器布局`container`,占满整个页面,对应的位置有对应的样式
  ```html
    <div class="main">
      <el-container class="main-content">
        <el-aside width="200px">Aside</el-aside>
        <el-container>
          <el-header height="50px">Header</el-header>
          <el-main>Main
            <button @click="handleExitClick">退出登录</button></el-main>
        </el-container>
      </el-container>
    </div>
  ```
- ==然后在`/components`中创建两个组件main-header/main-menu,分别放入main-header和main-aside==
  ```html
    <el-container class="main-content">
      <el-aside width="200px">
        <MainMenu />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <MainHeader />
        </el-header>
        <el-main>Main
          <button @click="handleExitClick">退出登录</button></el-main>
      </el-container>
    </el-container>
  ```
### 侧边栏main-menu
- 在主页的main-aside处的组件main-menu(简单的组件学习)
  [![pVijXsH.png](https://s21.ax1x.com/2025/06/08/pVijXsH.png)](https://imgse.com/i/pVijXsH)
- 样式调整-删除滚动条
  ```css
    /* 删除滚动条 */
    &::-webkit-scrollbar {
      display: none;
    }
  ```
### 菜单数据填充
- ==菜单数据已经获取,保存到pinia中,并且已经持久化保存到本地`login`; 优化数据的存储==
  ```ts
    state: (): ILoginState => ({
      token: localCache.getCache(LOGIN_TOKEN) ?? '',
      userInfo: localCache.getCache(LOGIN).userInfo ?? {},
      userMenu: localCache.getCache(LOGIN).userMenu ?? []
    })
  ```
- ==循环menu数据,**公司的数据可能没有老师整理的这么整齐,所以前端优先要做的是整理后端的数据变为自己想要的数据格式,然后再展示前端数据会简单整齐**==
  ```html
    <!-- for循环遍历菜单,template属性一般不要添加'v-for :key'这种属性,加到标签上,否则会导致el组件功能异常 -->
    <el-menu default-active="2" text-color="#b7bdc3" active-text-color="#fff" background-color="#001529">
      <el-sub-menu
        v-for="item in userMenu"
        :key="item.id"
        :index="String(item.id)"
      >
        <template #title>
          <el-icon>
            <!-- 后端返回的图表数据类似"el-icon-setting"的字符串数据 -->
            <component :is="item.icon.split('-icon-')[1]" />
          </el-icon>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item
          v-for="subItem in item.children"
          :key="subItem.id"
          :index="String(subItem.id)"
        >
          {{ subItem.name }}
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  ```
  > ==动态展示图标利用的动态组件`component`,回顾下这个知识==

### 侧边栏折叠
- ==练习vue中的父子通信==
- 顶部header点击'折叠'图标,实现折叠效果的同时,侧边栏main-aside(main内)的宽度跟随变化: ==子组件main-header影响到父组件main变化,子传父== 
- ==子main-header==
  ```html
    <div class="menu-icon" @click="handleMenuIconClick">
      <!-- 比v-if更加简单的html结构是动态组件component -->
      <el-icon size="28px">
        <!-- 注意: 例如当前处于折叠状态isFold=true,显示的图标应为Expand(展开),这样点击进入'展开'状态 -->
        <component :is="isFold ? 'Expand' : 'Fold'"></component>
      </el-icon>
    </div>
  ```
  ```ts
    /** 子传父: 定义emit */
    const emit = defineEmits(['changeFold'])
    /** 定义状态等 */
    const isFold = ref(false)
    /** 事件处理 */
    function handleMenuIconClick(){
      isFold.value = !isFold.value
      // 子传父,传递监听changeFold函数和参数isFold
      emit('changeFold',isFold.value)
    }
  ```
- ==父main==
  ```html
    <el-header height="50px">
        <!-- 子传父 -->
        <MainHeader @change-fold="handleChangeFold" />
    </el-header>
  ```
  ```ts
    const isFold = ref(false) // 折叠状态
    // 处理main-header遮挡变化
    function handleChangeFold(isFlag:boolean){
      isFold.value = isFlag // 父组件状态isFold 子组件传递参数isFlag
    }
  ```
- ==改变了父组件的宽度,同时把状态传入MainMenu组件,父传子==
  ```html
    <el-aside :width="isFold ? '60px': '200px'">
        <!-- 父传子 -->
        <MainMenu :is-fold="isFold"/>
    </el-aside>
  ```
  > 实现折叠不能只有侧边栏宽度变化,关键还是侧边栏内部的menu组件变化,menu组件有自己的属性,应用于折叠
- ==子MainMenu==
  ```html
     <h2 class="title" v-show="!isFold">宏远管理系统</h2>
     <el-menu :collapse="isFold">...</el-menu>
  ```
  ```ts
    /** 父传子: 定义props */
    defineProps({
      isFold: {
        type: Boolean,
        default: false
      }
    })
  ```
  > 通过折叠状态isFold决定el-menu组件的模式和标题h2显示
### header-info(过)
- 配置header顶部右侧的信息栏部分,在components/main-header在加/cpns/header-info
- 利用组件 下拉组件el-dropdown/el-avatar,省略代码都很简单

## **动态路由(重点)**
- 前端设计路由: 为了满足所有角色的使用,必须要注册所有的路由,通过菜单限制不同用户的权限,==但是有个漏洞,如果用url路径进行页面访问,其实仍然可以访问到权限之外的页面,因为前端设计初衷只是通过页面内的菜单来限制权限,无法对浏览器url进行限制==
- ==**动态路由: 根据不同的角色,动态注册应该有的路由; 而不是一次性把所有的路由注册**==
- 思路: 登录获取的信息: token/用户信息/菜单信息
- ==方法1(推荐) 基于菜单(Menu)的动态路由管理==
  ```
    在登陆后,我们获取到了菜单信息,已经动态展示了菜单
    所以根据菜单映射为路由对象注册,没有菜单证明没有权限,就不映射不注册了
  ```
- 方法2: 基于角色(Role)的动态路由管理
    ```ts
      const roles = {
        "superAdmin" : [所有路由] => router.main.children
        "admin" : [部分路由] => router.main.children
        "service" : [少量路由] => router.main.children
      + "manage" : [XXX] => router.main.children
      }
    ```
    > 缺点: 角色是固定的,一旦有新的角色加入,前端要重新发布新版本,后端也要加入新角色和它的路由配置,都会很麻烦

### 动态添加路由
- ==方便我们创建对应的文件和注册路由,但是创建都是有规律的,所以老师封装了一个工具,如果不会工具,自己手动创建也可以,就是麻烦一点==
- 下载: `npm i coderwhy -g`
- 命令: `coderwhy add3page_setup department -d src/views/main/system/department`; 创建vue3setup文件,-d代表文件创建路径,前面为文件名字,同时会在router中创建对应ts文件,这都是和后端有关系的,根据规律的数据创建规律的文件结构,==最终组件页面views和router创建的路由文件结构一样,共同进行联动==
- 创建文件结构示意图:
  [![pVFeY0x.png](https://s21.ax1x.com/2025/06/08/pVFeY0x.png)](https://imgse.com/i/pVFeY0x)
- 文件示例: ==**所有的文件结构对标Menu结构**==
  ```ts
    // router/main/analysis/dashboard/dashboard.ts
    const dashboard = () => import('@/views/main/analysis/dashboard/dashboard.vue')
    export default {
      path: '/main/analysis/dashboard',
      name: 'dashboard',
      component: dashboard,
      children: []
    }
  ```
  ```html
    <!-- /views/main/analysis/dashboard/dashboard.vue -->
    <template>
      <div class="dashboard">
        <h2>dashboard</h2>
      </div>
    </template>

    <script setup lang="ts" name="dashboard"></script>

    <style scoped>
      .dashboard {
      }
    </style>
  ```
- ==根据菜单动态添加路由==
  1.获取菜单(userMenu)
  2.获取菜单之后,动态获取所有路由对象(已存入独立文件),放入数组
  3.根据菜单匹配正确路由,添加到main内部
  ```ts
    // 因为代码过多所以封装为工具函数 -> utils/map-menus
    // store/login 异步函数中继续
    // 3.重点: 动态添加路由
    const routes = mapMenusToRoutes(this.userMenu)
    routes.forEach((route) => router.addRoute('main', route))
  ```
  ```ts
    import type { RouteRecordRaw } from "vue-router"

    export function mapMenusToRoutes(mapMenus: any[]) {
      
      // 1.1 动态加载所有路由对象,放入数组,路由item的类型为RouteRecordRaw; 不会的话可以写any
      const localRoutes: RouteRecordRaw[] = []
      // 1.2 读取所有router/main所有ts文件,匹配main下所有子目录中的所有.ts文件,默认是懒加载,我们希望立即获取导出的模块,添加属性eager:true
      // 修改files类型,原为string,unknown ,导致module无法进行任何操作
      const files: Record<string, any> = import.meta.glob("../router/main/**/*.ts", { eager: true })
      for (const key in files) {
        const module = files[key]
        localRoutes.push(module.default) // 最后的数组内容,如果你不想用import.meta.glob导出模块内容,手写也可以
      }

      // 2.匹配正确的路由,userMenu的路由url和localRoutes的路由path是一致的,所以当userMenu的url和localRoutes的path相同时,就添加这个路由
      // 工具内部不适合做添加路由这种操作,应当把整理好的路由返回出去,供用户自己随意使用
      const routes: RouteRecordRaw[] = []
      for (const menu of mapMenus) {
        for (const subMenu of menu.children) {
          const route = localRoutes.find((item) => item.path === subMenu.url)
          // 严谨的类型缩小,防止route为undefined类型
          if (route) routes.push(route)
        }
      }

      return routes
    }
  ```
  > ==coderwhy老师工具创建的ts文件导出都是有规律的(在工作中,可以依据这个数据思路整理后端发送的代码),获取这些文件的导出内容后(新知识),存入数组,然后匹配出合适的路由,放入数组并返回(动态路由的依据)==
- 文件导出的打印示意图
  [![pVFeTun.png](https://s21.ax1x.com/2025/06/08/pVFeTun.png)](https://imgse.com/i/pVFeTun)
- 双层遍历Menu的数据结构图
  [![pVFe7Bq.png](https://s21.ax1x.com/2025/06/08/pVFe7Bq.png)](https://imgse.com/i/pVFe7Bq)
### 页面刷新后路由持久化
- 正常登录后,路由会像上一节笔记那样进行一次动态路由添加,==但是页面重新刷新后,动态路由会消失==,由于动态添加路由的操作是登录点击异步函数loginAccountAction内的一部分,所以刷新后,并不会自动重新注册路由,==**所以刷新页面后需要重新执行一次动态路由注册函数**==
- ==在此基础上,添加新的action函数==
  ```ts
    // 刷新页面后,重新映射和注册路由的函数
    loadStoreAction() {
      // 用户刷新不一定要在main页面中,在login页面中刷新也会执行,但是如果有下面的条件,则一定是登录后,在main页面内刷新的
      if (this.token && this.userInfo && this.userMenu) {
        // 重新执行一次映射和注册路由
        const routes = mapMenusToRoutes(this.userMenu)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  ```
  > ==**接下来重点是确保这个函数能够在页面刷新时被调用**==
- 最外层main.ts文件,这是index.html引入的文件,页面刷新里面的ts代码也会重新执行一次,所以在这里调用,同时为了main.ts代码简洁,所以需要提取为函数,做法等同于前面自动导入ele元素的icon
  ```ts
    // main.ts
    import { createApp } from 'vue'
    import App from './App.vue'
    import router from '@/router'
    import store from '@/store'
    import icons from './global/register-incons'

    const app = createApp(App)
    app.use(icons) // app.use()引入插件函数会自动隐式传入第一个参数,实例对象app,无需我们自己传入
    app.use(store) // 同上,pinia内封装点东西
    app.use(router) // 先注册store再注册路由顺序更好,因为store中有重置动态路由的函数
    app.mount('#app')
  ```
  ```ts
    // store/index.ts
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
      loginStore.loadStoreAction() // 调用动态注册路由的函数
    }

    export default registerStore
  ```
  > ==连同之前的pinia持久化,这次又调用了loadStoreAction函数完成页面刷新时能够重新注册路由的操作==

### main页面的重定向
- ==**只要进入`/main`页面(无论url搜索框还是登录进入), 自动重定向到所拥有的路由的第一个路由页面**==
- ==1.首先记录注册动态路由时的第一个菜单==
- 回到工具函数mapMenusToRoutes,在最后一行添加
  ```ts
    export let firstMenu:any = null

    // function内 ....
    for (const menu of mapMenus) {
      for (const subMenu of menu.children) {
        const route = localRoutes.find((item) => item.path === subMenu.url)
        // 严谨的类型缩小,防止route为undefined类型
        if (route) routes.push(route)
        // 记录动态路由注册的第一个菜单
    +   if(!firstMenu && route) firstMenu = subMenu
      }
    }
  ```
  > ==这个firstMenu是一个本文件内的全局遍历,通过`export`导出,菜单的属性url就是跳转的路径==
- ==2.路由首位内执行跳转任务==
  ```ts
    // router/index.ts
    router.beforeEach((to,from) => {
      const token = localCache.getCache(LOGIN_TOKEN)
      // 没有token,先登录
      if(to.path.startsWith('/main') && !token){ 
        return '/login' 
      }
      // 如果进入main,则进入所拥有的第一个菜单
      if(to.path === '/main' && token) return firstMenu?.url 
    })
  ```
### Menu跳转和记忆保留
- ==这里的代码比coderwhy老师的代码更简洁,利用了组件的属性,可能老师那个时候elementPlus还没有这么完善==
- ==Menu跳转:== el-menu内开启router属性,点击el-menu-item可以跳转到其index属性的路由,而且coderwhy老师精巧的路由设计正好满足这个需求,所以el-menu-item内的index属性全部为`subItem.url`,也就是路由路径,这样直接完成了菜单跳转
- ==记忆保留: == 当我们选中菜单中某一项后,刷新页面希望自动打开上一次选中的菜单项,el-menu中提供属性default-active用于自动打开菜单的某一项,它的值和el-menu-item绑定的index值相关联,可以通过获取浏览器url的值,然后赋值给default-active来实现自动打开菜单的功能,url路径中的路由和菜单el-menu-item绑定的index是一致的(==coderwhy老师绝妙的数据设计魅力!==)
  ```html
    <el-menu :default-active="defaultActive">...</el-menu>
  ```
  ```ts
    // 2.Menu的默认菜单
    // 获取页面url,放入menu组件的属性default-active(默认选中的菜单项)
    const route = useRoute()
    const defaultActive = ref(route.path)
  ```

### 顶部面包屑(待)
- 页面已经搭建完成,导航组件(Nav/breadcrumb)
- 好像还是逃不过path->menu,不行就回去补补




