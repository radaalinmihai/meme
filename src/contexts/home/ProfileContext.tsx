import React, { createContext, useReducer } from "react";
import { IAction } from "../../helpers/interfaces";

const initialState = {
  loading: false,
  profile: {},
}

const profileStore: React.Context<any> = createContext(initialState);

const { Provider } = profileStore;

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

const ProfileProvider: React.FC = ({children}): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={{state, dispatch}}>{children}</Provider>;
};

export {ProfileProvider, profileStore};
