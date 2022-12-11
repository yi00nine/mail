import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const history = createWebHistory()

export const routes: RouteRecordRaw[] = [
  {
    path:'/',
    redirect:'/main'
  },
  {
    path:'/main',
    component:() => import('../layout/main'),
    redirect: '/main/normalPage',
    children: [
      {
        path: '/main/normalPage',
        component:()=>import('../views/normalPage/page1/index'),
        redirect:'/main/normalPage/page1',
        children:[
          {
            path: '/main/normalPage/page1',
            component:()=>import('../views/normalPage/page1/index'),
          },
          {
            path: '/main/normalPage/page2',
            component:()=>import('../views/normalPage/page2/index'),
          },
        ]
      }
    ]
  }
]

const router = createRouter({
  history,
  routes
})

router.beforeEach((to,from,next)=>{
  console.log(to,from)
  next()
})

export default router

export const getMenuItems = (isAdmin: boolean) => {
  const base: any = [
    {
      key: 'normalPage',
      label: '普通页面',
      children: [
        {
          key: 'page1',
          label: '普通页面1',
          children: null
        },
        {
          key: 'page2',
          label: '普通页面2',
          children: null
        }
      ]
    }
  ]
  return base
}