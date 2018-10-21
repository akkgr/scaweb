import OrgNodes from './views/OrgNodes'
import OrgNode from './views/OrgNode'

const indexRoutes = [
  { path: '/companies', component: OrgNodes },
  { path: '/services', component: OrgNodes },
  { path: '/programs', component: OrgNodes },
  { path: '/areas', component: OrgNodes },
  { path: '/actions', component: OrgNodes },
  { path: '/menu', component: OrgNodes },
  { path: '/submenu', component: OrgNodes },
  { path: '/orgnode/:id', component: OrgNode }
]

export default indexRoutes
