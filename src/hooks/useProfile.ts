import { useContext } from "react";
import { profileStore } from "../contexts/home/ProfileContext";
import httpClient from "../helpers/httpClient";
import { AxiosError } from "axios";
import { ResponseCodes, StatusCodes } from "../helpers/enums";
import { showMessage } from "react-native-flash-message";
import Actions from "../helpers/actions";
import useAuth from "./useAuth";
import useClient from "./useClient";
import axios from "axios";

const useProfile = () => {
  const {state: {loading, profile}, dispatch} = useContext(profileStore);
  const { access_token } = useAuth();

  const getProfile = (): void => {
    dispatch({
      type: Actions.FETCH_PROFILE
    });
    axios.get('/profile').then(res => {
      console.log(res.data);
      dispatch({
        type: Actions.FETCH_PROFILE_SUCCESS,
        payload: res.data.profile
      });
    }).catch((err: AxiosError) => {
      // console.error(err.request);
    });
    // httpClient.get("/profile").then(res => {
    //   console.log(access_token);
    //   if(res.data.code === ResponseCodes.OK)
    //     dispatch({
    //       type: Actions.FETCH_PROFILE_SUCCESS,
    //       payload: res.data.profile,
    //     });
    // }).catch((err: AxiosError) => {
    //   console.error(err);
    //   if(err.response?.status === StatusCodes.BadRequest) {
    //     showMessage({
    //       duration: 3000,
    //       message: 'Error',
    //       description: err.response.data?.message,
    //       type: 'danger'
    //     });
    //   }
    // });
  }

  return { loading, profile, getProfile };
}

export default useProfile;
