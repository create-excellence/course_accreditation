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
          title: '首页',
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
          title: '学生管理',
          icon: 'student'
        }
      }
    ]
  },
  {
    path: '/course',
    component: Layout,
    meta: {
      title: '课程管理',
      icon: 'course'
    },
    children: [
      {
        path: '/course',
        component: () => import('@/views/course/index.vue'),
        meta: {
          title: '课程管理',
          icon: 'course',
          breadcrumb: false
        }
      },
      {
        path: '/course/:courseId(\\d+)/course-class',
        component: () => import('@/views/course-class/show.vue'),
        meta: {
          title: '开课班级',
          hidden: true
        }
      }
    ]
  },
  {
    path: '/select-course',
    component: Layout,
    redirect: '/select-course/index',
    meta: {
      title: '选课管理',
      icon: 'select-course'
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
        path: 'select',
        component: () => import('@/views/select-course/select.vue'),
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
          title: '专业管理',
          icon: 'major'
        }
      }
    ]
  },

  {
    path: '/graduation-demand',
    component: Layout,
    meta: {
      title: '毕业要求管理',
      icon: 'graduation-demand'
    },
    children: [
      {
        path: '/graduation-demand',
        component: () => import('@/views/graduation-demand/index.vue'),
        meta: {
          title: '毕业要求',
          icon: 'graduation-demand',
          breadcrumb: false
        }
      },
      {
        path: '/graduation-demand/:graduationDemandId(\\d+)/graduation-point',
        component: () => import('@/views/graduation-point/show.vue'),
        meta: {
          title: '毕业指标点',
          noCache: true,
          activeMenu: '/graduation-demand',
          hidden: true
        },
        children: [ {
          path: '/graduation-demand/:graduationDemandId(\\d+)/graduation-point/:graduationPointId(\\d+)/supporting-course',
          component: () => import('@/views/supporting-course/show.vue'),
          meta: {
            title: '支撑课程',
            noCache: true,
            activeMenu: '/graduation-demand',
            hidden: true
          }
        }]
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
          title: '毕业要求指标点',
          icon: 'graduation-point'
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
          title: '支撑课程管理',
          icon: 'supporting-course'
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
          title: '学期管理',
          icon: 'semester'
        }
      }
    ]
  },
  {
    path: '/questionnaire',
    component: Layout,
    children: [
      {
        path: '/questionnaire',
        component: () => import('@/views/questionnaire/index.vue'),
        meta: {
          title: '问卷',
          icon: 'example'
        }
      },
      {
        path: '/questionnaire/:questionnaireId(\\d+)/course-target',
        component: () => import('@/views/course-target/show.vue'),
        meta: {
          title: 'CourseTargetShow',
          noCache: true,
          activeMenu: '/graduation-demand',
          hidden: true
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
          title: '老师管理',
          icon: 'teacher'
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
          title: '开课班级管理',
          icon: 'course-class'
        }
      }
    ]
  },
  {
    path: '/teacher-person-info',
    component: Layout,
    redirect: '/teacher-person-info/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/teacher-person-info/index.vue'),
        meta: {
          title: '个人信息',
          icon: 'course-class'
        }
      }
    ]
  },
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
