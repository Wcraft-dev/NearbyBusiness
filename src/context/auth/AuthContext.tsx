import { createContext } from "react";
import { AuthContextType, Action, State, ActionKind } from "../../@types/Auth";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthReducer = (state: State, { payload, type }: Action): State => {
  switch (type) {
    case ActionKind.AUTH:
      return {
        ...state,
        userToken: payload.userToken,
        role: payload.role,
        homePath: payload.homePath,
        business: payload.business,
      };
    case ActionKind.SIGN_OUT:
      return {
        userToken: payload.userToken,
        role: payload.role,
        homePath: payload.homePath,
        business: payload.business,
      };
    default:
      return state;
  }
};

export default AuthContext;
