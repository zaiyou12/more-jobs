import { createRouter, createWebHashHistory, RouteParams } from 'vue-router'
import Home from './pages/Home.vue'

export type AppRouteNames = 'home'
| 'article'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
    },
    {
      name: 'article',
      path: '/article/:slug',
      component: Home,
    }
  ]
})

export function routerPush(name: AppRouteNames, params?: RouteParams): ReturnType<typeof router.push> {
  if (params !== undefined) {
    return router.push({
      name,
      params,
    })
  } else {
    return router.push({ name })
  }
}
