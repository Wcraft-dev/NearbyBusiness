import SignIn from "../../screen/auth/SignIn";
import SignUp from "../../screen/auth/SignUp";
import SignOut from "../../screen/auth/SignOut";

const auth = [
  {
    path: "/login",
    component: SignIn,
  },
  {
    path: "/register",
    component: SignUp,
  },
  {
    path: "/signOut",
    component: SignOut,
  },
];
export default auth;
