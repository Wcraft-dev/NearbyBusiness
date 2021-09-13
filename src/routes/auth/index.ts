import SignIn from "../../screen/auth/SignIn";
import SignUp from "../../screen/auth/SignUp";
import SignOut from "../../screen/auth/SignOut";

const auth = [
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
