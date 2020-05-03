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
  }
]

export const DynamicRoutes : RouteConfig[] = [
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
    path: '/teacher-my-course',
    component: Layout,
    redirect: '/teacher-my-course/index',
    meta: {
      title: '我的课程',
      icon: 'course',
      roles: ['teacher']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/teacher-my-course/index.vue'),
        meta: {
          title: '我的课程',
          icon: 'course',
          breadcrumb: false,
          roles: ['teacher']
        }
      }, {
        path: ':courseClassId(\\d+)/student',
        component: () => import('@/views/teacher-my-course/class-student.vue'),
        meta: {
          title: '查看学生',
          hidden: true,
          activeMenu: '/teacher-my-course/index',
          roles: ['teacher']
        }
      }
    ]
  }, {
    path: '/questionnaire',
    component: Layout,
    meta: {
      title: '问卷',
      roles: ['teacher']
    },
    children: [
      {
        path: '/questionnaire',
        component: () => import('@/views/questionnaire/index.vue'),
        meta: {
          title: '问卷',
          icon: 'questionnaire',
          breadcrumb: false,
          roles: ['teacher']
        }
      },
      {
        path: '/questionnaire/:questionnaireId(\\d+)/course-target',
        component: () => import('@/views/course-target/show.vue'),
        meta: {
          title: '题目编辑',
          noCache: true,
          activeMenu: '/questionnaire',
          hidden: true,
          roles: ['teacher']
        }
      }
    ]
  }, {
    path: '/course-evaluation',
    component: Layout,
    redirect: '/course-evaluation/evaluation',
    meta: {
      title: '课程评价',
      icon: 'evaluation',
      alwaysShow: true
    },
    children: [
      {
        path: 'release-evaluation',
        component: () => import('@/views/course-evaluation/release-evaluation.vue'),
        meta: {
          title: '发布课程评价',
          icon: 'evaluation',
          roles: ['teacher']
        }
      },
      {
        path: 'evaluation',
        component: () => import('@/views/course-evaluation/evaluation.vue'),
        meta: {
          title: '已发布课程评价',
          icon: 'evaluation',
          roles: ['teacher']
        }
      }, {
        path: 'evaluation/:courseEvaluationId(\\d+)/evaluation-detail',
        component: () => import('@/views/course-evaluation/evaluation-detail.vue'),
        meta: {
          title: '查看评价详情',
          hidden: true,
          roles: ['teacher']
        }
      }]
  }, {
    path: '/student',
    component: Layout,
    redirect: '/student/index',
    meta: {
      roles: ['admin']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/student/index.vue'),
        meta: {
          title: '学生管理',
          icon: 'student',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/course',
    component: Layout,
    meta: {
      title: '课程管理',
      icon: 'course',
      roles: ['admin']
    },
    children: [
      {
        path: '/course',
        component: () => import('@/views/course/index.vue'),
        meta: {
          title: '课程管理',
          icon: 'course',
          breadcrumb: false,
          roles: ['admin']
        }
      },
      {
        path: '/course/:courseId(\\d+)/course-class',
        component: () => import('@/views/course-class/show.vue'),
        meta: {
          title: '开课班级',
          hidden: true,
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/select-course',
    component: Layout,
    redirect: '/select-course/index',
    meta: {
      roles: ['admin']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/select-course/index.vue'),
        meta: {
          title: '选课管理',
          icon: 'select-course',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/major',
    component: Layout,
    redirect: '/major/index',
    meta: {
      roles: ['admin']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/major/index.vue'),
        meta: {
          title: '专业管理',
          icon: 'major',
          roles: ['admin']
        }
      }
    ]
  }, {
    path: '/my-course',
    component: Layout,
    redirect: '/my-course/index',
    meta: {
      roles: ['student']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/select-course/my-course.vue'),
        meta: {
          title: '我的选课',
          icon: 'course',
          roles: ['student']
        }
      }
    ]
  }, {
    path: '/my-evaluation',
    component: Layout,
    redirect: '/my-evaluation/index',
    meta: {
      roles: ['student']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/course-evaluation/my-evaluation.vue'),
        meta: {
          title: '我的课程评价',
          icon: 'evaluation',
          roles: ['student']
        }
      }, {
        path: ':courseEvaluationId(\\d+)/evaluation_test',
        component: () => import('@/views/course-evaluation/evaluation_test.vue'),
        meta: { hidden: true, title: '课程评价', roles: ['student'] }
      }
    ]
  },
  {
    path: '/student-info',
    component: Layout,
    redirect: '/student-info/index',
    meta: {
      title: '个人中心',
      icon: 'person-center',
      roles: ['student']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/student-info/index.vue'),
        meta: {
          title: '个人信息',
          icon: 'student',
          roles: ['student']
        }
      },
      {
        path: 'change-password',
        component: () => import('@/views/change-password/index.vue'),
        meta: {
          title: '修改密码',
          icon: 'password',
          roles: ['student']
        }
      }
    ]
  },

  {
    path: '/graduation-demand',
    component: Layout,
    meta: {
      title: '毕业要求管理',
      icon: 'graduation-demand',
      roles: ['admin']
    },
    children: [
      {
        path: '/graduation-demand',
        component: () => import('@/views/graduation-demand/index.vue'),
        meta: {
          title: '毕业要求管理',
          icon: 'graduation-demand',
          breadcrumb: false,
          roles: ['admin']
        }
      },
      {
        path: '/graduation-demand/:graduationDemandId(\\d+)/graduation-point',
        component: () => import('@/views/graduation-point/show.vue'),
        meta: {
          title: '毕业指标点',
          noCache: true,
          activeMenu: '/graduation-demand',
          hidden: true,
          roles: ['admin']
        },
        children: [ {
          path: '/graduation-demand/:graduationDemandId(\\d+)/graduation-point/:graduationPointId(\\d+)/supporting-course',
          component: () => import('@/views/supporting-course/show.vue'),
          meta: {
            title: '支撑课程',
            activeMenu: '/graduation-demand',
            hidden: true,
            roles: ['admin']
          }
        }]
      }

    ]
  },
  {
    path: '/graduation-point',
    component: Layout,
    redirect: '/graduation-point/index',
    meta: {
      title: '毕业要求指标点管理',
      icon: 'graduation-point',
      roles: ['admin']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/graduation-point/index.vue'),
        meta: {
          title: '毕业要求指标点管理',
          icon: 'graduation-point',
          breadcrumb: false,
          roles: ['admin']
        }
      },
      {
        path: '/graduation-point/:graduationPointId(\\d+)/supporting-course',
        component: () => import('@/views/supporting-course/show.vue'),
        meta: {
          title: '支撑课程',
          noCache: true,
          activeMenu: '/graduation-point',
          hidden: true,
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/supporting-course',
    component: Layout,
    redirect: '/supporting-course/index',
    meta: {
      roles: ['admin']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/supporting-course/index.vue'),
        meta: {
          title: '支撑课程管理',
          icon: 'supporting-course',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/semester',
    component: Layout,
    meta: {
      roles: ['admin']
    },
    redirect: '/semester/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/semester/index.vue'),
        meta: {
          title: '学期管理',
          icon: 'semester',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/index',
    meta: {
      roles: ['admin']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/teacher/index.vue'),
        meta: {
          title: '老师管理',
          icon: 'teacher',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/course-class',
    component: Layout,
    redirect: '/course-class/index',
    meta: {
      roles: ['admin']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/course-class/index.vue'),
        meta: {
          title: '开课班级管理',
          icon: 'course-class',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/teacher-person-info',
    component: Layout,
    redirect: '/teacher-person-info/index',
    meta: {
      title: '个人中心',
      icon: 'person-center',
      roles: ['teacher']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/teacher-person-info/index.vue'),
        meta: {
          title: '基本信息',
          icon: 'person-info',
          roles: ['teacher']
        }
      },
      {
        path: 'change-password',
        component: () => import('@/views/change-password/index.vue'),
        meta: {
          title: '修改密码',
          icon: 'password',
          roles: ['teacher']
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
  base: '/app/',
  // base: process.env.BASE_URL,
  routes: routes
})

const router = createRouter()

export default router
