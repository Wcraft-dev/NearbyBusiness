import React from "react";
import DashboardBussines from "../screen/dashboards/DashboardBussines";
import DashboardNormal from "../screen/dashboards/DashboardNormal";
import Home from "../screen/Home";
import auth from "./auth";
import { AuthRole, routesType } from "../@types/Auth";

const routes: routesType = [
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
    permission: AuthRole.EMPRESARIO,
  },
  {
    path: "/productos",
    component: DashboardNormal,
    show: false,
    shadow: true,
    permission: AuthRole.NORMAL,
  },
];
export default routes;
