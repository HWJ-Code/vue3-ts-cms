import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
    // children: [] 由返回的菜单usermenus动态决定
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes: routes,
  history: createWebHashHistory()
})

router.beforeEach((to) => {
  const token = localCache.getCache('token')
  if (to.path != '/login' && !token) {
    //路由跳转验证token 没有token跳到登录页
    return '/login'
  }

  //显示第一个菜单
  if (to.path == '/main') {
    return firstMenu.url
  }
})
export default router
