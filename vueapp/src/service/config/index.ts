export const TIME_OUT = 10000

// vite提供的import.meta.env对象上的特殊环境变量
// vite打包机制是先运行,不打包,不经过node,只有运行build指令后才会打包
/** vite提供的默认环境变量之一: import.meta.env.MODE
 *  MODE: 模式 development/production, 测试prod可以打包后运行 npm run preview 进行预览,产看环境
 *  布尔类型 import.meta.env.DEV/PROD
 *  其余的以后再说
 */
let BASE_URL = ""

if(import.meta.env.MODE === 'production'){ // 生产环境
  BASE_URL = 'http://codercba.com:5000'
}else { // 开发环境
  BASE_URL = 'http://codercba.com:5000'
}

export { BASE_URL }

// vite支持自定义全局变量,在.env文件中,以VITE开头设置变量,例如VITE_NAME = 'coderwhy'
// 可以在对应环境设置对应变量
// .env.development/.production .env.[mode]


// .env.local / .env.[mode].local
// 不加local可以提交git仓库,加local后此文件不可提交git仓库,可以保存隐私变量(管理员密码等)
