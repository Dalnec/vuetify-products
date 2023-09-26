// Composables
import { useUserStore } from '@/store/auth'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layouts/default/Default.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'products',
        name: 'Products',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: 'sale',
        name: 'Sale',
        component: () => import('@/views/Sale.vue'),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    meta: { prefetch: true },
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/:catchAll(.*)",
    name: "Page not found",
    beforeEnter: (to, from, next) => next({ path: "/" })
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  userStore.checkAuthentication()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (userStore.isAuthenticated) {
      console.log("000000");
      next();
      return;
    } else {
      next({ name: "Login" });
      return;
    }
  } else {
    next();
    return;
  }
})


export default router
