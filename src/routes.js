import OrgNode from "./components/OrgNode";

const indexRoutes = [
  { path: "/companies", component: OrgNode },
  { path: "/services", component: OrgNode },
  { path: "/programs", component: OrgNode },
  { path: "/areas", component: OrgNode },
  { path: "/actions", component: OrgNode },
  { path: "/menu", component: OrgNode },
  { path: "/submenu", component: OrgNode }
];

export default indexRoutes;
