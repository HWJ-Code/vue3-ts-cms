import { IBreadcrumbs } from '@/base-ui/breadcrumb'
import { RouteRecordRaw } from 'vue-router'

//第一次进页面显示第一个菜单
let firstMenu: any = null

//根据菜单usermenus返回需要添加的路由
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  //1、先去加载默认所有的routes(router/main所有)
  const allRoutes: RouteRecordRaw[] = []

  // require.context()自动导入路由文件
  /**
   * require.context函数接受三个参数
     - directory {String} -读取文件的路径
     - useSubdirectories {Boolean} -是否遍历文件的子目录
     - regExp {RegExp} -匹配文件的正则
   */
  const routeFiles = require.context('../router/main', true, /\.ts$/)

  /**
   * require.context函数执行后返回的是一个函数,并且这个函数有3个属性
    - resolve {Function} -接受一个参数request,request为test文件夹下面匹配文件的相对路径,返回这个匹配文件相对于整个工程的相对路径
    - keys {Function} -返回匹配成功模块的名字组成的数组
    - id {String} -执行环境的id,返回的是一个字符串,主要用在module.hot.accept
   */
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    // route.default --> 路由文件内容
    allRoutes.push(route.default)
  })

  // 2、根据菜单usermenus获取需要添加的routes
  /**
   * 递归usermenus:
   * type === 1 -> 遍历children -> type === 1
   * type === 2 -> 拿出url -> 添加route
   */
  const _recurseGetRoute = function (menus: any[]) {
    for (const menu of menus) {
      if (menu.type === 1) {
        _recurseGetRoute(menu.children)
      } else {
        const route = allRoutes.find((v) => v.path === menu.url)
        if (route) routes.push(route)
        if (!firstMenu) firstMenu = menu
      }
    }
  }
  _recurseGetRoute(userMenus)
  // console.log(routeFiles.keys())
  // console.log(routes)
  return routes
}

export { firstMenu }

//根据当前路由获取对应menu的信息 [{name: , path: }]（父级一起返回）
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumbs[] = []
  getMenuByRoute(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

export function getMenuByRoute(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumbs[] //面包屑数据
): any {
  for (const menu of userMenus) {
    if (menu.type == 1) {
      const findMenu = getMenuByRoute(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

//只获取当前子菜单路由
// export function getMenuByRoute(userMenus: any[], currentPath: string): any {
//   for (const menu of userMenus) {
//     if (menu.type == 1) {
//       const findMenu = getMenuByRoute(menu.children ?? [], currentPath)
//       if (findMenu) return findMenu
//     } else if (menu.type === 2 && menu.url === currentPath) {
//       return menu
//     }
//   }
// }
