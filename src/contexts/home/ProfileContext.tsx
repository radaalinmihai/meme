import React, { createContext, useReducer } from "react";
import { IAction, IProfile } from "../../helpers/interfaces";
import Actions from "../../helpers/actions";

const initialState: IProfile = {
  loading: false,
  profile: {},
}

const profileStore: React.Context<any> = createContext(initialState);

const { Provider } = profileStore;

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case Actions.FETCH_PROFILE:
      return {
        ...state,
        loading: true,
      };
    case Actions.FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload,
      };
    case Actions.FETCH_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const ProfileProvider: React.FC = ({children}): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={{state, dispatch}}>{children}</Provider>;
};

export {ProfileProvider, profileStore};
