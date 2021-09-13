import { createContext } from "react";
import { AUTH, SIGN_OUT } from "../types";

const AuthContext = createContext("");

export const AuthReducer = (state, { payload, type }) => {
  switch (type) {
    case AUTH:
      return {
        ...state,
        userToken: payload.token,
        role: payload.type,
        homePath: payload.homePath,
        business: payload.business,
      };
    case SIGN_OUT:
      return {
        userToken: payload.userToken,
        role: payload.role,
        homePath: payload.homePath,
      };
    default:
      return state;
  }
};

export const AuthRoles = {
  NORMAL: "NORMAL",
  NORMAL_PATH: "/productos",
  EMPRESARIO: "EMPRESARIO",
  EMPRESARIO_PATH: "/dashboard",
};
export default AuthContext;
