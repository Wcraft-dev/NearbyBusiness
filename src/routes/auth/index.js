import SignIn from "../../screen/auth/SignIn";
import SignUp from "../../screen/auth/SignUp";

const auth = [
  {
    path: "/login",
    component: SignIn,
  },
  {
    path: "/register",
    component: SignUp,
  },
];
export default auth;
