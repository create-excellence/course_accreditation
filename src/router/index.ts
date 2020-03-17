import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'

/* Layout */
import Layout from '@/layout/index.vue'

Vue.use(Router)

/*
  Note: sub-menu only appear when children.length>=1
  Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
*/

/*
  name:'router-name'             the name field is required when using <keep-alive>, it should also match its component's name property
                                 detail see : https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    roles: ['admin', 'editor']   will control the page roles (allow setting multiple roles)
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    hidden: true                 if true, this route will not show in the sidebar (default is false)
    alwaysShow: true             if true, will always show the root menu (default is false)
                                 if false, hide the root menu when has less or equal than one children route
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    noCache: true                if true, the page will not be cached (default is false)
    affix: true                  if true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
*/

export const routes: RouteConfig[] = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: {
      title: 'Login',
      hidden: true
    }
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
    meta: {
      title: '404',
      hidden: true
    }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
        meta: {
          title: 'Dashboard',
          icon: 'dashboard'
        }
      }
    ]
  },
  {
    path: '/student',
    component: Layout,
    redirect: '/student/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/student/index.vue'),
        meta: {
          title: 'Student',
          icon: 'example',
          roles: ['student']
        }
      }
    ]
  },
  {
    path: '/course',
    component: Layout,
    redirect: '/course/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/course/index.vue'),
        meta: {
          title: 'Course',
          icon: 'example'
        }
      }
    ]
  },
  {
    path: '/select-course',
    component: Layout,
    redirect: '/select-course/index',
    meta: {
      title: 'SelectCourse',
      icon: 'nested'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/select-course/index.vue'),
        meta: {
          title: 'SelectCourse',
          icon: 'form'
        }
      },
      {
        path: 'student',
        component: () => import('@/views/select-course/student.vue'),
        meta: {
          title: 'StudentSelectCourse',
          icon: 'form'
          // roles: ['student']
        }
      },
      {
        path: 'my-course',
        component: () => import('@/views/select-course/my-course.vue'),
        meta: {
          title: 'MyCourse',
          icon: 'form'
          // roles: ['student']
        }
      }
    ]
  },
  {
    path: '/major',
    component: Layout,
    redirect: '/major/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/major/index.vue'),
        meta: {
          title: 'Major',
          icon: 'table'
        }
      }
    ]
  },
  {
    path: '/supporting-course',
    component: Layout,
    redirect: '/supporting-course/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/supporting-course/index.vue'),
        meta: {
          title: 'SupportingCourse',
          icon: 'example'
        }
      }
    ]
  },
  {
    path: '/graduation-demand',
    component: Layout,
    children: [
      {
        path: '/graduation-demand',
        component: () => import('@/views/graduation-demand/index.vue'),
        meta: {
          title: 'GraduationDemand',
          icon: 'example'
        }
      },
      {
        path: '/graduation-demand/:graduationDemandId(\\d+)/graduation-point',
        component: () => import('@/views/graduation-point/show.vue'),
        meta: {
          title: 'GraduationPointShow',
          noCache: true,
          activeMenu: '/graduation-demand',
          hidden: true
        }
      },
      {
        path: '/graduation-demand/:graduationDemandId(\\d+)/graduation-point/:graduationPointId(\\d+)/supporting-course',
        component: () => import('@/views/supporting-course/show.vue'),
        meta: {
          title: 'SupportingCourseShow',
          noCache: true,
          activeMenu: '/graduation-demand',
          hidden: true
        }
      }
    ]
  },
  {
    path: '/graduation-point',
    component: Layout,
    redirect: '/graduation-point/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/graduation-point/index.vue'),
        meta: {
          title: 'GraduationPoint',
          icon: 'example'
        }
      }
    ]
  },
  {
    path: '/semester',
    component: Layout,
    redirect: '/semester/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/semester/index.vue'),
        meta: {
          title: 'Semester',
          icon: 'table'
        }
      }
    ]
  },
  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/teacher/index.vue'),
        meta: {
          title: 'Teacher',
          icon: 'table'
        }
      }
    ]
  },
  {
    path: '/course-class',
    component: Layout,
    redirect: '/course-class/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/course-class/index.vue'),
        meta: {
          title: 'CourseClass',
          icon: 'table'
        }
      }
    ]
  },
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import(/* webpackChunkName: "form" */ '@/views/form/index.vue'),
  //       meta: {
  //         title: 'Form',
  //         icon: 'form'
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import(/* webpackChunkName: "menu1" */ '@/views/nested/menu1/index.vue'),
  //       redirect: '/nested/menu1/menu1-1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import(/* webpackChunkName: "menu1-1" */ '@/views/nested/menu1/menu1-1/index.vue'),
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import(/* webpackChunkName: "menu1-2" */ '@/views/nested/menu1/menu1-2/index.vue'),
  //           redirect: '/nested/menu1/menu1-2/menu1-2-1',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import(/* webpackChunkName: "menu1-2-1" */ '@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import(/* webpackChunkName: "menu1-2-2" */ '@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import(/* webpackChunkName: "menu1-3" */ '@/views/nested/menu1/menu1-3/index.vue'),
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import(/* webpackChunkName: "menu2" */ '@/views/nested/menu2/index.vue'),
  //       meta: { title: 'Menu2' }
  //     }
  //   ]
  // },
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/Armour/vue-typescript-admin-template',
  //       meta: {
  //         title: 'External Link',
  //         icon: 'link'
  //       }
  //     }
  //   ]
  // },
  {
    path: '*',
    redirect: '/404',
    meta: { hidden: true }
  }
]

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: routes
})

const router = createRouter()

export default router
