import React, { useReducer } from "react";
import AuthContext, { AuthReducer } from "./AuthContext";
import { AUTH } from "../types";

//Fake Auth
async function connectToServer(data) {
  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  await timeout(3000);

  if (data.email === "example@hola.com") {
    if (data.password === "Hola123") {
      return {
        token: "MITOKEN",
        role: "EMPRESARIO",
        data: { name: "NAME", displayName: "NAMEDISPLAY", picture: "http" },
      };
    }
  }
  return { error: "user not found" };
}

const AuthState = (props) => {
  const initialState = {
    userToken: null,
    role: null,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const singIn = async (data) => {
    try {
      const resolve = await connectToServer(data);
      console.log(resolve);
      if (resolve.token) {
        dispatch({ type: AUTH, payload: resolve });
        return true;
      } else {
        throw resolve;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  const singUp = async (data) => {
    try {
      const resolve = await connectToServer(data);
      console.log(resolve);
      if (resolve.token) {
        dispatch({ type: AUTH, payload: resolve });
        return true;
      } else {
        throw resolve;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  const accessRoute = (route) => {
    if (!route.permission) return true;
    if (route.permission === state.role) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userToken: state.userToken,
        role: state.role,
        singIn,
        singUp,
        accessRoute,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
