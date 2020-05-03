import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { RouteConfig } from 'vue-router'
import { DynamicRoutes, routes } from '@/router'
import store from '@/store'
import { UserModule } from '@/store/modules/user'
const hasPermission = (roles: string[], route: RouteConfig) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

export const filterDynamicRoutes = (routes: RouteConfig[], roles: string[]) => {
  const res: RouteConfig[] = []
  routes.forEach(route => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterDynamicRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}

export interface IPermissionState {
  routes: RouteConfig[]
  dynamicRoutes: RouteConfig[]
}

@Module({ dynamic: true, store, name: 'permission' })
class Permission extends VuexModule implements IPermissionState {
  public routes: RouteConfig[] = []
  public dynamicRoutes: RouteConfig[] = []

  @Mutation
  private SET_ROUTES(newRoutes: RouteConfig[]) {
    this.routes = routes.concat(newRoutes)
    this.dynamicRoutes = newRoutes
  }

  @Action
  public genrateRoutes() {
    let accessedRoutes
    accessedRoutes = filterDynamicRoutes(DynamicRoutes, UserModule.roles)
    this.SET_ROUTES(accessedRoutes)
  }
}

export const PermissionModule = getModule(Permission)
