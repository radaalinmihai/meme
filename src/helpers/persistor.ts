import AsyncStorage from "@react-native-async-storage/async-storage";
import {Reducer, ReducerWithoutAction} from "react";

import {IAction, IAuth, IRegister} from "./interfaces";

const statePersister = (key: string, initialState: IAuth): IAuth => {
  AsyncStorage.getItem(key)
    .then(
      (state): IAuth => {
        console.log({state});
        if (state === null) {
          return initialState;
        } else {
          return JSON.parse(state);
        }
      },
    )
    .catch(
      (err): IAuth => {
        console.error(err);
        return initialState;
      },
    );
};

const reducerPersister = (key: string, reducer: any) => (state: IAuth, action: IAction) => {
  console.log("heyy!!");
  const newState = reducer(state, action);
  AsyncStorage.setItem(key, JSON.stringify(newState))
    .then(() => {
      return newState;
    })
    .catch((err) => {
      console.error(err);
      return newState;
    });
};

export {reducerPersister, statePersister};
