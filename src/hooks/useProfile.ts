import { useContext } from "react";
import { profileStore } from "../contexts/home/ProfileContext";
import { AxiosError, AxiosResponse } from "axios";
import Actions from "../helpers/actions";
import axios from "axios";
import showError from "../helpers/showError";
import { Profile, ProfileReq, ProfileTable } from "../helpers/interfaces";

const useProfile = () => {
  const { state, dispatch } = useContext(profileStore);
  const { loading, profile } = state as Profile;

  const getProfile = (): void => {
    dispatch({
      type: Actions.FETCH_PROFILE,
    });
    axios
      .get("/profile")
      .then((res: AxiosResponse<ProfileReq>) => {
        dispatch({
          type: Actions.FETCH_PROFILE_SUCCESS,
          payload: res.data.profile,
        });
      })
      .catch((err: AxiosError) => {
        console.error(err.response);
        showError("Something went wrong");
      });
  };

  const updateProfile = (body: ProfileTable): void => {
    axios
      .put(`/profile/${profile.profileId}`, JSON.stringify(body))
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err.response);
      });
  };

  return { loading, profile, getProfile, updateProfile };
};

export default useProfile;
