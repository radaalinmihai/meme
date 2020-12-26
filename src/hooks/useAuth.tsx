import {useContext} from 'react';
import {authStore} from '../contexts/auth/AuthContext';
import { GET_USER } from "../contexts/auth/AuthActions";
import { IAuthCred } from "../helpers/interfaces";
import axios from "axios";

export default function useAuth() {
  const {state, dispatch} = useContext(authStore);

  const login = (data: IAuthCred) => {
    axios.get('https://randomuser.me/api/').then((res: any) => {
      dispatch({
        type: GET_USER,
        payload: res.data.results,
      });
    });
  };

  return {state, login};
}
