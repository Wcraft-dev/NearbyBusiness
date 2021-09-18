import SignIn from "../../screen/auth/SignIn";
import SignUp from "../../screen/auth/SignUp";
import SignOut from "../../screen/auth/SignOut";
import { routesType } from "../../@types/Auth";

const auth: routesType = [
  {
    path: "/login",
    displayName: "Iniciar Sesion",
    show: true,
    component: SignIn,
  },
  {
    path: "/register",
    displayName: "Registrate",
    show: true,
    component: SignUp,
  },
  {
    path: "/signOut",
    displayName: "Cierra Sesion",
    show: false,
    component: SignOut,
  },
];
export default auth;
