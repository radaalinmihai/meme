import React, {createContext} from "react";
import {usePersistStorage} from "react-native-use-persist-storage";

import {IAuth} from "../../helpers/interfaces";

const initialState: IAuth = {
  access_token: "",
  refresh_token: "",
};

const authStore: React.Context<any> = createContext(initialState);

const {Provider} = authStore;
const persistKey = "@user";

const AuthProvider: React.FC = ({children}): JSX.Element => {
  const [state, dispatch] = usePersistStorage<IAuth>(persistKey, initialState);

  return <Provider value={{state, dispatch}}>{children}</Provider>;
};

export {AuthProvider, authStore};
