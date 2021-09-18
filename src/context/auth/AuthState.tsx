import React, { useReducer, useEffect, FC } from "react";
import AuthContext, { AuthReducer } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  UserCredential,
  User,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import {
  AuthDataSign,
  IFirebaseError,
  routeType,
  AuthRole,
  State,
  AuthAction,
  SignOutAction,
  ReducerAuth,
  Action,
  AuthHomePath,
} from "../../@types/Auth";

const AuthState: FC = (props) => {
  const initialState: State = {
    userToken: "",
    role: null,
    homePath: null,
    business: "",
  };
  const [state, dispatch] = useReducer<ReducerAuth<State, Action>>(
    AuthReducer,
    initialState
  );

  const validErrorsFB = (e: IFirebaseError) => {
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
      case "auth/user-disabled":
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

  const signIn = async (data: AuthDataSign) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Ingresaste con extio");
      return true;
    } catch (e: any) {
      validErrorsFB(e);
      return false;
    }
  };

  const googleSingIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Ingresaste con exito");
    } catch (e: any) {
      validErrorsFB(e);
    }
  };
  const signUp = async (data: AuthDataSign) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await setDoc(doc(db, "users", user.uid), {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        business: data.business,
        type: data.type,
        firstLogin: true,
      });
      toast("Registrado con exito");
      return true;
    } catch (e: any) {
      validErrorsFB(e);
      return false;
    }
  };
  const fnsignOut = async () => {
    try {
      dispatch({ ...SignOutAction, payload: initialState });
      signOut(auth);
    } catch (e: any) {
      validErrorsFB(e);
    }
  };
  const accessRoute = (route: routeType) => {
    if (!route.permission) return true;
    if (route.permission === state.role) {
      return true;
    } else {
      return false;
    }
  };
  const dataUser = async (id: string, user?: User) => {
    const res = await getDoc(doc(db, "users", id));
    const data = res.data();
    if (res.exists()) {
      let homePath = null;
      if (data?.type === AuthRole.EMPRESARIO) {
        homePath = AuthHomePath.EMPRESARIO_PATH;
      } else if (data?.type === AuthRole.NORMAL) {
        homePath = AuthHomePath.NORMAL_PATH;
      }
      const payload: State = {
        ...res.data(),
        userToken: id,
        homePath,
        role: data?.type,
        business: data?.business,
      };
      dispatch({ ...AuthAction, payload });
    } else {
      if (user) {
        await setDoc(doc(db, "users", id), {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          type: AuthRole.NORMAL,
          firstLogin: true,
        });
        dataUser(id);
      } else {
        toast.error("No se encontro el usuario");
      }
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) dataUser(user.uid, user);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        UserData: {
          userToken: state.userToken,
          role: state.role,
          homePath: state.homePath,
          business: state.business,
        },
        signIn,
        signUp,
        signOut: fnsignOut,
        googleSingIn,
        accessRoute,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
