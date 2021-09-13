import DashboardBussines from "../screen/dashboards/DashboardBussines";
import DashboardNormal from "../screen/dashboards/DashboardNormal";
import Home from "../screen/Home";
import auth from "./auth";
import { AuthRoles } from "../context/auth/AuthContext";

const routes = [
  {
    path: "/",
    displayName: "Inicio",
    show: true,
    component: Home,
  },
  ...auth,
  {
    path: "/dashboard",
    component: DashboardBussines,
    show: false,
    shadow: true,
    permission: AuthRoles.EMPRESARIO,
  },
  {
    path: "/productos",
    component: DashboardNormal,
    show: false,
    shadow: true,
    permission: AuthRoles.NORMAL,
  },
];
export default routes;
