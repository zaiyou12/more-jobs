import { createRouter, createWebHistory, RouteParams } from 'vue-router'
import Home from './pages/Home.vue'

export type AppRouteNames = 'home'
| 'article'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
    },
    {
      name: 'article',
      path: '/article/:index/:date/:title',
      component: () => import('./pages/Article.vue'),
      props: true
    }
  ]
})

router.beforeEach((to, from, next) => {
  // When user go back from article details to home, keep user in the same category
  if (from.name === 'article' && to.name === 'home') {
    if (!to.params.workType) {
      next({ name: to.name, params: { workType: from.params.workType}})
      return
    }
  }
  next()
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
