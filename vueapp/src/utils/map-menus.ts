import type { RouteRecordRaw } from "vue-router"

export let firstMenu:any = null

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
      // 记录动态路由注册的第一个菜单
      if(!firstMenu && route) firstMenu = subMenu
    }
  }

  return routes
}



interface IBreadcrumbs {
  name: string,
  path?: string
}

/** 根据路径匹配需要显示的菜单面包屑数组
 * @param path 需要匹配的路径
 * @param userMenus 所有的菜单
 */

export function mapPathToBreadcrumbs(path: string, userMenus: any[]){
  const breadcrumbs: IBreadcrumbs[] = []
  for(const menu of userMenus){
    for(const subMenu of menu.children){
      if(subMenu.url === path){
        // 把匹配到的菜单链条连同名字和path信息一同加入数组
        breadcrumbs.push({name: menu.name})
        breadcrumbs.push({name: subMenu.name , path: subMenu.url})
      }
    }
  }

  return breadcrumbs
}

