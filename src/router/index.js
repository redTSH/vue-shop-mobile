import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home/Home')
  },
  {
    path: '/orderConfirm/:id',
    name: 'OrderConfirm',
    component: () => import(/* webpackChunkName: "orderConfirm" */ '../views/OrderConfirm/OrderConfirm')
  },
  {
    path: '/cartpage',
    name: 'CartPage',
    component: () => import(/* webpackChunkName: "cart" */ '../views/CartPage/CartPage')
  },
  {
    path: '/orderList',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "orderList" */ '../views/OrderList/OrderList')
  },
  {
    path: '/my',
    name: 'My',
    component: () => import(/* webpackChunkName: "my" */ '../views/My/My')
  },
  {
    path: '/locationManage',
    name: 'LocationManage',
    component: () => import(/* webpackChunkName: "locationManage" */ '../views/Location/LocationManage')
  },
  {
    path: '/locationEdit/:id',
    name: 'LocationEdit',
    component: () => import(/* webpackChunkName: "locationEdit" */ '../views/Location/LocationEdit')
  },
  {
    path: '/locationCreate',
    name: 'LocationCreate',
    component: () => import(/* webpackChunkName: "locationCreate" */ '../views/Location/LocationCreate')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login/Login'),
    beforeEnter(to, from, next) {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register/Register'),
    beforeEnter(to, from, next) {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/Shop/Shop')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.isLogin
  if (isLogin || to.name === 'Login' || to.name === 'Register') {
    next()
  } else {
    next({ name: 'Login' })
  }
})

export default router
