import { UserModule } from '@/store/modules/user'
import { VuexModule, Module, getModule, MutationAction } from 'vuex-module-decorators'
import { RouteConfig } from 'vue-router'
import store from '@/store'
import { routes } from '@/router'

const hasPermission = (roles: string[], route: RouteConfig) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

export const filterRoutes = (routes: RouteConfig[], roles: string[]) => {
  const res: RouteConfig[] = []
  routes.forEach(route => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}

export interface IPermissionState {
  routes: RouteConfig[]
}

@Module({ dynamic: true, store, name: 'permission' })
class Permission extends VuexModule implements IPermissionState {
  routes: RouteConfig[] = []

  @MutationAction({ mutate: ['routes'] })
  async genrateRoutes() {
    let accessedRoutes = filterRoutes(routes, UserModule.roles).filter(item => item.children && item.children.length > 0)
    return { routes: accessedRoutes }
  }
}

export const PermissionModule = getModule(Permission)
