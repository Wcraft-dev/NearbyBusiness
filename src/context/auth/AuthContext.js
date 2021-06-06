import { createContext } from "react";
import { AUTH } from "../types";

const AuthContext = createContext();

export const AuthReducer = (state, { payload, type }) => {
  switch (type) {
    case AUTH:
      return {
        ...state,
        isSignout: false,
        userToken: payload.token,
        role: payload.type,
      };
    case "":
      return {
        ...state,
      };
    default:
      return state;
  }
};

export const AuthRoles = {
  NORMAL: "NORMAL",
  EMPRESARIO: "EMPRESARIO",
};
export default AuthContext;
