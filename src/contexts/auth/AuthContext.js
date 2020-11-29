import React, {createContext, useReducer} from 'react';
import {GET_USER} from './AuthActions';

const INITIAL_STATE = {
  email: '',
  password: '',
  results: [],
};

const authStore = createContext();

const {Provider} = authStore;

const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case GET_USER:
        return {...state, results: action.payload};
      default:
        return state;
    }
  }, INITIAL_STATE);

  return <Provider value={{state, dispatch}}>{children}</Provider>;
};

export {AuthProvider, authStore};
