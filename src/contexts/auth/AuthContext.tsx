import React, { createContext, useEffect, useReducer } from "react";
import { SIGN_IN, SIGN_IN_FAIL, SIGN_IN_SUCCESS, SIGN_UP } from "./AuthActions";
import { IAction, IAuth } from "../../helpers/interfaces";
import { reducerPersister, statePersister } from "../../helpers/persistor";

const initialState: IAuth = {
  access_token: "",
  refresh_token: "",
  error: ""
};

const authStore: React.Context<any> = createContext(initialState);

const reducer = (state: IAuth, action: IAction): IAuth => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return { ...state, ...action.payload, loading: false };
    case SIGN_IN_FAIL:
      return { ...state, error: action.payload };
    case SIGN_UP:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const { Provider } = authStore;
const persistKey: string = '@user';

const AuthProvider: React.FC = ({ children }): JSX.Element => {
  const [state, dispatch] = useReducer(
    reducerPersister(persistKey, reducer),
    statePersister(persistKey, initialState)
  );
  useEffect(() => {
    console.log({ state });
  }, [state]);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { AuthProvider, authStore };
