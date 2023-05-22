import { lazy } from 'react'

// isDevMenu=true只在开发环境显示
const router = [
  {
    title: 'xx管理',
    icon: 'base',
    path: '/',
    key: '/',
    component: lazy(() => import('../Layout')),
    children: [
      {
        title: '首页',
        icon: 'home',
        className: 'm-sidebar-home',
        path: '/',
        key: 'home',
        component: lazy(() => import('../views/Home')),
        mate:{
          breadcrumb:[
            {
              name:'home',
              path:'/home'
            },
            {
              name:'home',
              path:'/home'
            }
          ]
        }
      },
      {
        title: '仪表盘',
        icon: 'dashboard',
        className: 'm-sidebar-dashboard',
        path: '/dashboard',
        key: 'dashboard',
        component: lazy(() => import('../views/Dashboard')),
        mate:{
          breadcrumb:[
            {
              name:'home',
              path:'/home'
            },
            {
              name:'仪表盘',
              path:'/dashboard'
            }
          ]
        }
      },
      {
        title: 'resource',
        icon: '',
        path: '/resource',
        key: 'resource',
        component: lazy(() => import('../views/Resource'))
      },   
      {
        title: 'category',
        icon: '',
        path: '/category?/:id',
        key: 'category',
        component: lazy(() => import('../views/Category')),
        mate:{
          breadcrumb:[
            {
              name:'home',
              path:'/home'
            },
            {
              name:'category',
              path:'/category'
            }
          ]
        }
      }                                     
    ]
  },
  {
    title: 'login',
    icon: 'login',
    className: 'm-sidebar-login',
    path: '/login',
    key: 'login',
    component: lazy(() => import('../views/Login'))
  }, 
  {
    title: 'not Found',
    icon: 'notFound',
    className: 'm-sidebar-login',
    path: '*',
    key: 'notFound',
    component: lazy(() => import('../views/NotFound'))
  },
]


export default router