import React, {createContext, useReducer} from 'react';
import {GET_USER} from './AuthActions';
import { IAction } from "../../helpers/interfaces";

interface IAuth {
  email: string;
  password: string;
  results: Array<any>;
}

const initialState: IAuth = {
  email: '',
  password: '',
  results: [],
};

const authStore: React.Context<any> = createContext(initialState);

const {Provider} = authStore;

const AuthProvider: React.FC = ({children}): JSX.Element => {
  const [state, dispatch] = useReducer((state: IAuth, action: IAction) => {
    switch (action.type) {
      case GET_USER:
        return {...state, results: action.payload};
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{state, dispatch}}>{children}</Provider>;
};

export {AuthProvider, authStore};
