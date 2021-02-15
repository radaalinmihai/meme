import { useContext } from "react";
import { profileStore } from "../contexts/home/ProfileContext";
import httpClient from "../helpers/httpClient";
import { AxiosError } from "axios";
import { ResponseCodes, StatusCodes } from "../helpers/enums";
import { showMessage } from "react-native-flash-message";
import Actions from "../helpers/actions";

const useProfile = () => {
  const {state: {loading, profile}, dispatch} = useContext(profileStore);

  const getProfile = (): void => {
    dispatch({
      type: Actions.FETCH_PROFILE
    });
    httpClient.get("/profile").then(res => {
      if(res.data.code === ResponseCodes.OK)
        dispatch({
          type: Actions.FETCH_PROFILE_SUCCESS,
          payload: res.data.profile,
        });
    }).catch((err: AxiosError) => {
      if(err.response?.status === StatusCodes.BadRequest) {
        showMessage({
          duration: 3000,
          message: 'Error',
          description: err.response.data?.message,
          type: 'danger'
        });
      }
    });
  }

  return { loading, profile, getProfile };
}

export default useProfile;
