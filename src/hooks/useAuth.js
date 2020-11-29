import { useContext } from 'react';
import { authStore } from '../contexts/auth/AuthContext';
import {loginAction} from '../contexts/auth/AuthActions';

export default function useAuth() {
    const {state, dispatch} = useContext(authStore);

    const login = (data) => {
        loginAction(data)(dispatch);
    }

    return {state, login};
}