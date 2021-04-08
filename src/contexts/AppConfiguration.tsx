import React, {createContext, FunctionComponent, useContext, useReducer} from "react";

import {IAction, IAppConfiguration} from "../helpers/interfaces";

const initialState: IAppConfiguration = {
  cardRotationValue: 15,
  cardThresholdFraction: 3,
  cardActiveStartRotation: -10,
};

const ConfigurationStore: React.Context<IAppConfiguration> = createContext(initialState);

const reducer = (state = initialState, action: IAction<Partial<IAppConfiguration>>) => {
  switch (action.type) {
    default:
      return state;
  }
};

const ConfigurationProvider: FunctionComponent = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ConfigurationStore.Provider value={{state, dispatch}}>{children}</ConfigurationStore.Provider>
  );
};

export const useConfiguration = () => {
  const {state} = useContext(ConfigurationStore);

  return state;
};

export default ConfigurationProvider;
