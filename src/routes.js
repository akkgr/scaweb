import OrgNodes from "./components/OrgNodes";
import OrgNode from "./components/OrgNode";
import Login from "./components/Login";

const indexRoutes = [
  { path: "/login", component: Login },
  { path: "/companies", component: OrgNodes },
  { path: "/services", component: OrgNodes },
  { path: "/programs", component: OrgNodes },
  { path: "/areas", component: OrgNodes },
  { path: "/actions", component: OrgNodes },
  { path: "/menu", component: OrgNodes },
  { path: "/submenu", component: OrgNodes },
  { path: "/orgnode/:id", component: OrgNode }
];

export default indexRoutes;
