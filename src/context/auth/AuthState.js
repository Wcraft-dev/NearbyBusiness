import React, { useReducer, useEffect } from "react";
import AuthContext, { AuthReducer, AuthRoles } from "./AuthContext";
import { auth, db } from "../../firebase";
import firebase from "firebase/app";
import { toast } from "react-toastify";
import { AUTH, SIGN_OUT } from "../types";

const AuthState = (props) => {
  const initialState = {
    userToken: null,
    role: null,
    homePath: null,
    business: null,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const validErrorsFB = (e) => {
    switch (e.code) {
      case "auth/email-already-in-use":
        toast("Correo ya usado", { type: "error" });
        break;
      case "auth/weak-password":
        toast("Contraseña muy debil", { type: "error" });
        break;
      case "auth/popup-closed-by-user":
        toast("Se ha cerrado la pagina, por favor vulve a intetar", {
          type: "error",
        });
        break;
      case "auth/invalid-email":
        toast("Correo no valido", { type: "error" });
        break;
      case "auth/wrong-password":
        toast("Coreo o contraseña equivocados", { type: "error" });
        break;
      case "auth/user-disable":
        toast("Se desactivado tu cuenta, consulta servicio al cliente", {
          type: "error",
        });
        break;
      case "auth/user-not-found":
        toast("Coreo o contraseña equivocados", { type: "error" });
        break;
      case "permission-denied":
        break;
      default:
        console.log(e.message, e.code);
        break;
    }
  };

  const signIn = async (data) => {
    try {
      await auth.signInWithEmailAndPassword(data.email, data.password);
      toast("Ingresaste con extio");
      return true;
    } catch (e) {
      validErrorsFB(e);
    }
  };

  const googleSingIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const res = await auth.signInWithPopup(provider);
      if (res.credential) {
        await db.collection("users").doc(res.user.uid).set({
          name: res.user.displayName,
          email: res.user.email,
          photo: res.user.photoURL,
          type: AuthRoles.NORMAL,
          firstLogin: true,
        });
      }
      toast("Ingresaste con extio");
    } catch (e) {
      validErrorsFB(e);
    }
  };
  const signUp = async (data) => {
    try {
      const res = await auth.createUserWithEmailAndPassword(
        data.email,
        data.password
      );
      await db.collection("users").doc(res.user.uid).set({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        business: data.business,
        type: data.type,
        firstLogin: true,
      });
      toast("Registrado con exito");
      return true;
    } catch (e) {
      validErrorsFB(e);
    }
  };
  const signOut = async () => {
    try {
      dispatch({ type: SIGN_OUT, payload: initialState });
      auth.signOut();
    } catch (e) {
      validErrorsFB(e);
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
  const dataUser = async (id) => {
    const res = await db.collection("users").doc(id).get();
    let homePath = null;
    if (res.data().type === AuthRoles.EMPRESARIO) {
      homePath = AuthRoles.EMPRESARIO_PATH;
    } else if (res.data().type === AuthRoles.NORMAL) {
      homePath = AuthRoles.NORMAL_PATH;
    }
    const data = { ...res.data(), token: id, homePath };
    dispatch({ type: AUTH, payload: data });
  };
  const authListener = async () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dataUser(user.uid);
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userToken: state.userToken,
        role: state.role,
        homePath: state.homePath,
        business: state.business,
        signIn,
        signUp,
        signOut,
        googleSingIn,
        accessRoute,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
